<?php
abstract class UrlshareMobileApplication extends EyeosApplicationExecutable {
	/**
	 * Put the mail subject & body in the params of the JS app with the next format:
	 *	args[0]	->	eyeOS path of the file	->	Is given in the js, don't modify
	 *	args[1]	->	Subject of the mail		->	URLSHARE_SUBJECT global param setted in the settings.php
	 *	args[2]	->	Body of the mail		->	URLSHARE_MAIL global param setted in the settings.php
	 */
	public static function __run(AppExecutionContext $context, MMapResponse $response) {
		$args = $context->getArgs();
		$args[1] = URLSHARE_SUBJECT;
		$args[2] = URLSHARE_MAIL;
		$context->setArgs($args);

//		Load the library in the js for prevent that every time the function it's called all the user has to download all again
//		$buffer = '';
//		$buffer .= file_get_contents('extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.js');
//		$buffer .= file_get_contents('extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.mobile.js');
//		$buffer .= file_get_contents('extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.css');
//		$response->appendToBody($buffer);
	}
}
?>