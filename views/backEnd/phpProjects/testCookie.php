<?php

  setcookie('a', 'aaa');
  setcookie('b', 'bbb');
//  echo $_COOKIE[$key];

//先把下面的注释掉，访问一下，看cookie里有没有a,b,
//再把下面注释打开，看页面会不会输出aaa,

  setcookie('a', null);
  setcookie('b', null);

  $key = 'a';
  echo $_COOKIE[$key];
?>