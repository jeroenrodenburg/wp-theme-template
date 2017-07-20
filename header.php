<?php
/**
 *  Theme:
 *  Template:       header.php
 *  Description:    Header template with navigation
 */
?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">
  <head>
    <title><?php bloginfo( 'name' ); ?></title>
    <meta charset="utf-8" />
	  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	  <meta name="mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>

    <header id="header" role="banner">
      <div class="header-top">
        <div class="header-container">

        </div>
      </div>
      <div class="header-bottom">
        <div class="header-container">

        </div>
      </div>
    </header>
