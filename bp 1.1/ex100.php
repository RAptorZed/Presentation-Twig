<?php
// формируем массив
$nav = array(
  'peoples' => array(
    array('id' => '1','name' => 'name1', 'soname' => 'soname1'),
    array('id' => '2','name' => 'name2', 'soname' => ''),
    array('id' => '3','name' => '', 'soname' => 'soname3'),
    array('id' => '','name' => 'name4', 'soname' => 'soname4'),
    array('id' => '','name' => '', 'soname' => '')
  ),

  'prices' => array(
    array('id' => '1','item' => 'item1', 'price' => '10.31'),
    array('id' => '2','item' => 'item2', 'price' => '12.50'),
    array('id' => '3','item' => '', 'price' => ''),
    array('id' => '','item' => 'item4', 'price' => '33.00'),
  )
);

include 'Twig/Autoloader.php';
Twig_Autoloader::register();

try {
  $loader = new Twig_Loader_Filesystem('templates');

  $twig = new Twig_Environment($loader);

  $template = $twig->loadTemplate('100.tmpl');

  echo $template->render(array (
    'nav' => $nav
  ));

} catch (Exception $e) {
  die ('ERROR: ' . $e->getMessage());
}
?>
