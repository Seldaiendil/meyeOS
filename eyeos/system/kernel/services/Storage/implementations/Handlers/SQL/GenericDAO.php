<?php
/*
*                 eyeos - The Open Source Cloud's Web Desktop
*                               Version 2.0
*                   Copyright (C) 2007 - 2010 eyeos Team 
* 
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
* 
* You should have received a copy of the GNU Affero General Public License
* version 3 along with this program in the file "LICENSE".  If not, see 
* <http://www.gnu.org/licenses/agpl-3.0.txt>.
* 
* See www.eyeos.org for more details. All requests should be sent to licensing@eyeos.org
* 
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
* 
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* eyeos" logo and retain the original copyright notice. If the display of the 
* logo is not reasonably feasible for technical reasons, the Appropriate Legal Notices
* must display the words "Powered by eyeos" and retain the original copyright notice. 
*/

require dirname(__FILE__) . '/interface.php';

/**
 *
 * @package kernel-services
 * @subpackage Storage
 */
class GenericDAO implements IStorageHandler, ISQLHandler, ITransactionHandler {

    /**
     * PDO connection string
     * @var string
     */
    protected $connectionString;

    /**
     * DataBase Handler
     * @var resource
     */
    protected $dbh = null;
    /**
     * DataBase User Name
     * @var string
     */
    protected $userName;
    /**
     * DataBase string for userName
     * @see $userName
     * @var string
     */
    protected $password;
    /**
     * Prefix database tables
     * @var string
     */
    protected $prefix;

    /**
     * Cached primary keys container
     * 
     * @var array
     */
    protected $primaryKey = array();


	protected static $ignoredMethods = array(
			'getMeta',
			'setMeta'
	);

	public function __construct(array $params = null) {
		$this->connectionString = $params['connectionString'];
		$this->username = $params['username'];
		$this->password = $params['password'];
		$this->prefix = isset($params['prefix']) ? $params['prefix'] : '';

                /**
                 * If the class is instanciated, the connection will be used
                 */
                $this->dbh = $this->getConnection();
                
	}

	public function beginTransaction() {
		$this->dbh->beginTransaction();
	}

	public function commit() {
		$this->dbh->commit();
	}

	public function create($transferObject) {
		try {
			$attributes = $this->getTransferObjectAttributes($transferObject);
			$fields = array();
			$values = array();
			$valuesParsed = array();

			// Check if the transfer object already has a PK
			$primaryKey = $this->getPrimaryKey($transferObject);
			$method = 'get' . ucfirst($primaryKey);
			$objectPrimaryKey = $transferObject->$method();
			$mustSetPrimaryKey = $objectPrimaryKey ? false : true;

			foreach ($attributes as $attributeName) {
				$method = 'get' . ucfirst($attributeName);
				$value = $transferObject->$method();

				if ($value !== null) {
					$fields[] = $attributeName;
					$values[] = ':' . $attributeName;
					$valuesParsed[$attributeName] = $value;
				}
			}
			$query = 'INSERT INTO `' . $this->getTableName($transferObject, $this->prefix) . '` (' . join(', ', $fields) . ') VALUES (' . join(', ', $values) . ')';


			$stmt = $this->dbh->prepare($query);


			foreach ($valuesParsed as $attributeName => $value) {
				$stmt->bindValue(':' . $attributeName, $value, PDO::PARAM_STR);
			}

			try {
				$stmt->execute();
				if ($mustSetPrimaryKey) {
					$method = 'set' . ucfirst($primaryKey);
					$transferObject->$method($this->dbh->lastInsertId());
				}
			} catch (PDOException $e) {
				if ($e->errorInfo[0] == '23000') {
					throw new EyeIntegrityConstraintViolationException('', 0, $e);
				}
			}
		} catch (Exception $e) {
			if ($e instanceof EyeIntegrityConstraintViolationException) {
				throw $e;
			}
			throw new EyeDAOException('Unable to insert given $transferObject into database.', 0 ,$e);
		}
	}

	public function delete($transferObject) {
		try {
			$primaryKey = $this->getPrimaryKey($transferObject);

			$query = 'DELETE FROM `' . $this->getTableName($transferObject, $this->prefix) . '` WHERE ' . $primaryKey . ' = :' . $primaryKey;
			
			$stmt = $this->dbh->prepare($query);

			$method = 'get' . ucfirst($primaryKey);
			$stmt->bindValue(':' . $primaryKey, $transferObject->$method(), PDO::PARAM_STR);

			$stmt->execute();
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to delete given $transferObject from database.', 0 ,$e);
		}
	}

	public function prepare($query) {
		try {
			return $this->dbh->prepare($query);
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to prepare given query.', 0 ,$e);
		}
	}

	protected function bind($stmt, $data) {
		try {

			foreach ($data as $key => $value) {
				$stmt->bindValue(':' . $key, $value, PDO::PARAM_STR);
			}
			return $stmt;
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to bind params to given $stmt.', 0 ,$e);
		}
	}


	public function execute($stmt, $data = null) {
		try {
			if ($data !== null) {
				$stmt = $this->bind($stmt, $data);
			}
			if ($stmt->execute()) {
				return $stmt;
			} else {
				throw new EyeDAOException('Unable to execute given $stmt.', 0 ,$e);
			}
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to execute given $stmt.', 0 ,$e);
		}
	}

	public function getConnection() {
		try {
			if ($this->dbh == null) {

				$this->dbh = new PDO($this->connectionString, $this->username, $this->password);
				$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                                $this->dbh->query("SET NAMES 'utf8'");
			}

			return $this->dbh;
		} catch (Exception $e) {
			Logger::getLogger('system.services.Storage.GenericDAO')->error('Cannot connect to the database: ' . $e->getMessage());
			throw $e;
		}
	}

        /**
         * Return the primary key of an transferObject
         *
         * @param Object $transferObject
         * @return string
         */
	public function getPrimaryKey($transferObject) {

            /**
             * retrieve the table associated to the transferObject
             */
            $table = $this->getTableName($transferObject, $this->prefix);

            /**
             * If don't exist a cached PrimaryKey.... query for it
             * save it in a session key.
             *
             * When query it from database and cached at object level, consume more than one milisecond: 1,259 µs
             */
            if (!isset($_SESSION['eyeOs']['GenericDAO']['primaryKey'][$table]))
            //if (!isset($this->primaryKey[$table]))
            {
                try
                {

                    /**
                     * Query for PrimaryKey directly to information_schema
                     */
                    $query = "SELECT column_name

                    FROM information_schema.KEY_COLUMN_USAGE

                    WHERE TABLE_SCHEMA = ?
                    and TABLE_NAME = ?
                    and CONSTRAINT_NAME = 'PRIMARY'

                    order by ORDINAL_POSITION

                    limit 1";

                    $stmt = $this->dbh->prepare($query);
                    if ($stmt->execute(array(SQL_NETSYNC_DBNAME, $table)))
                    {
                        /**
                         * only is needed one column and row
                         */
                        $_SESSION['eyeOs']['GenericDAO']['primaryKey'][$table] = $stmt->fetchColumn();
                        //$this->primaryKey[$table] = $stmt->fetchColumn();
                    }
                    else
                    {
                        throw new EyeDAOException($this->dbh->errorInfo(), 0);
                    }
                }
                catch(Exception $e)
                {
                    /**
                     * Log and propagate the error.
                     */
                    $errMsg = "Unable to get Primary Key from transferObject {$table}. " . $e->getMessage();
                    Logger::getLogger('system.services.Storage.GenericDAO')->error($errMsg);
                    throw new EyeDAOException($errMsg, 0, $e);
                }

            }

            /**
             * returns the primary key.
             */
            return $_SESSION['eyeOs']['GenericDAO']['primaryKey'][$table];
            //return $this->primaryKey[$table];
	}

        /**
         * Returns the table associated to an Object.
         *
         * @param object $transferObject
         * @param string $prefix
         * @return string
         */
	protected static function getTableName($transferObject, $prefix = null) {

            /**
             * If $prefix is not empty, add it
             */
		if (!empty($prefix)) {
			$pref = $prefix . '_';
		}
                else
                {
                    $pref = '';
                }

		return strtolower($pref . get_class($transferObject));
	}

	protected static function getTransferObjectAttributes($transferObject) {
		$methods = get_class_methods(get_class($transferObject));
		$toReturn = array();

		foreach ($methods as $methodName) {
			if (!in_array($methodName, self::$ignoredMethods)) {
				$tmpMethodName = substr($methodName, 3);		//for "getThisAttribute" we'll have "ThisAttribute" here
				$fieldName = strtolower($tmpMethodName);
				$type = substr($methodName, 0, 3);

				//both getters AND setters must exist
				if ($type == 'get' && in_array('set' . $tmpMethodName, $methods)) {
					$toReturn[] = $fieldName;
				}
			}
		}

		return $toReturn;
	}

	public function read($transferObject, $primaryKey = null) {
		try {
			$primaryKey = $this->getPrimaryKey($transferObject);

			$query = 'SELECT * FROM `' . $this->getTableName($transferObject, $this->prefix) . '` WHERE ' . $primaryKey . ' = :' . $primaryKey;
			$stmt = $this->dbh->prepare($query);
			$method = 'get' . ucfirst($primaryKey);
			$stmt->bindValue(':' . $primaryKey, $transferObject->$method(), PDO::PARAM_STR);

			$stmt->execute();
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to read given $transferObject from database.', 0 ,$e);
		}

                /**
                 * Fetch only one row
                 * Don't use PDO::FETCH_CLASS because $transferObject is passed by reference
                 */
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if (!isset($result)) {
			throw new EyeResultNotFoundException();
		}

		foreach ($result as $key => $value) {
			$methodName = 'set' . ucfirst($key);
			$transferObject->$methodName($value);
		}
	}

	public function readAll($transferObject, $limit = false) {
		try {
			$query = 'SELECT * FROM `' . $this->getTableName($transferObject, $this->prefix) . '`';

			if($limit) {
				if(is_numeric($limit)) {
					$query .= ' LIMIT ' . $limit;
				} else {
					throw new EyeDAOException('The limit must be an integer value.');
				}
			}

			$stmt = $this->dbh->prepare($query);

			$stmt->execute();
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to retrieve all data of type $transferObject from database.', 0 ,$e);
		}

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$toReturn = array();

		foreach ($result as $entry) {
			$objectClass = get_class($transferObject);
			$row = new $objectClass;
			//$row = $transferObject->factory();		// TODO: maybe new $objectClass crash on some PHP versions

			foreach ($entry as $key => $value) {
				$methodName = 'set' . ucfirst($key);
				$row->$methodName($value);
			}

			$toReturn[] = $row;
		}

		return $toReturn;
	}

	public function rollback() {
		$this->dbh->rollback();
	}

	public function search($transferObject, $primaryKey = null) {
		try {
			$primaryKey = $this->getPrimaryKey($transferObject);

			$attributes = $this->getTransferObjectAttributes($transferObject);
			$clauses = array();

			foreach ($attributes as $attributeName) {
				if ($attributeName != $primaryKey) {
					$fn = 'get' . ucfirst($attributeName);
					$value = $transferObject->$fn();

					if ($value !== null) {
						$clauses[] = $attributeName . ' = :' . $attributeName;
					}
				}
			}

			$query = 'SELECT * FROM `' . $this->getTableName($transferObject, $this->prefix) . '` WHERE ' . join(' AND ', $clauses);
			$stmt = $this->dbh->prepare($query);

			foreach ($attributes as $attributeName) {
				if ($attributeName != $primaryKey) {
					$methodName = 'get' . ucfirst($attributeName);
					$value = $transferObject->$methodName();

					if ($value !== null) {
						$stmt->bindValue(':' . $attributeName, $value, PDO::PARAM_STR);
					}
				}
			}
			$stmt->execute();
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to search all data matching $transferObject from database.', 0 ,$e);
		}

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$toReturn = array();

		foreach ($result as $entry) {
			$objectClass = get_class($transferObject);
			$row = new $objectClass;
			//$row = $transferObject->factory();		// TODO: check if "new $objectClass" crash on some PHP versions

			foreach ($entry as $key => $value) {
				$methodName = 'set' . ucfirst($key);
				$row->$methodName($value);
			}

			$toReturn[] = $row;
		}

		return $toReturn;
	}

	public function send($query) {
		return $this->dbh->query($query);
	}

	public function update($transferObject, $primaryKey = null) {
		try {
			$primaryKey = $this->getPrimaryKey($transferObject);

			$attributes = $this->getTransferObjectAttributes($transferObject);
			$newValues = array();
			$valuesParsed = array();

			foreach ($attributes as $attributeName) {
				$method = 'get' . ucfirst($attributeName);
				$value = $transferObject->$method();

				$newValues[] = $attributeName . ' = :' . $attributeName;
                $valuesParsed[$attributeName] = $value;
			}

			$query = 'UPDATE `' . $this->getTableName($transferObject, $this->prefix) . '` SET ' . join(', ', $newValues) . ' WHERE ' . $primaryKey . ' = :' . $primaryKey;
			$stmt = $this->dbh->prepare($query);

			foreach ($valuesParsed as $attributeName => $value) {
				$stmt->bindValue(':' . $attributeName, $value, PDO::PARAM_STR);
			}

			$stmt->execute();
		} catch (Exception $e) {
			throw new EyeDAOException('Unable to update given $transferObject data into database.', 0 ,$e);
		}
	}
}
?>