---
id: 107
title: "Magento Unicode URL Key for Products, Categories, CMS Pages"
excerpt: "By default Magento does not support using UTF-8 characters as URL Keys, this tutorial show you how to make Magento accept non-english characters for Products, Categories and CMS pages. "
published_date: "2015-05-17"
tags: ["Magento"]
---

By default, Magento does not support using UTF-8 characters as URL Keys. This tutorial shows how to make Magento accept non-English characters for Products, Categories, and CMS pages.

This solution has been tested on Magento CE 1.9.1.0+:

1. Open \app\code\core\Mage\Core\Controller\Request\Http.php . At the setPathInfo method replace:

```php
$requestUri = $this->getRequestUri();
```

with:

```php
$requestUri = urldecode($this->getRequestUri());
```

2. Open `\app\code\core\Mage\Catalog\Model\Product\Url.php` and at the `formatUrlKey` method replace:

```php
$urlKey = preg_replace('#[^0-9a-z]+#i', '-', Mage::helper('catalog/product_url')->format($str));
$urlKey = strtolower($urlKey);
```

with

```php
$urlKey = preg_replace('#()*!~-=+|\/[^0-9a-z%]+#i', '-', Mage::helper('catalog/product_url')->format($str));
$urlKey = str_replace(' ', '-', $urlKey);
$urlKey = mb_strtolower($urlKey,'UTF-8');
```

3. Open `\app\code\core\Mage\Catalog\Model\Category.php` and at the `formatUrlKey` method replace:

```php
$urlKey = preg_replace('#[^0-9a-z]+#i', '-', $str);
$urlKey = strtolower($urlKey);
```

with:

```php
$urlKey = preg_replace('#()*!~-=+|\/[^0-9a-z%]+#i', '-', $str);
$urlKey = str_replace(' ', '-', $urlKey);
$urlKey = mb_strtolower($urlKey,'UTF-8');
```

4- Open `\app\code\core\Mage\Cms\Model\Resource\Page.php` and at the `_beforeSave` add this code after the first foreach:

```php
// url key utf8
$str = $object->getData('identifier');
$identifier = preg_replace('#()*!~-=+|\/[^0-9a-z%]+#i', '-', $str);
$identifier = str_replace(' ', '-', $identifier);
$identifier = mb_strtolower($identifier,'UTF-8');
$identifier = trim($identifier, '-');
$object->setData('identifier', $identifier);
//url key utf8
```

Also at the same file find isValidPageIdentifier method and replace:

```php
return preg_match('/^[a-z0-9][a-z0-9_\/-]+(\.[a-z0-9_-]+)?$/', $object->getData('identifier'));
```

with:

```php
return TRUE;
```

5. Open \app\code\core\Mage\Adminhtml\Block\Cms\Page\Edit\Tab\Main.php and at the \_prepareForm method replace:

```php
$fieldset->addField('identifier', 'text', array(
  'name' => 'identifier',
  'label' => Mage::helper('cms')->__('URL Key'),
  'title' => Mage::helper('cms')->__('URL Key'),
  'required' => true,
  'class' => 'validate-identifier',
  'note' => Mage::helper('cms')->__('Relative to Website Base URL'),
  'disabled' => $isElementDisabled
));
```

with:

```php
$fieldset->addField('identifier', 'text', array(
  'name' => 'identifier',
  'label' => Mage::helper('cms')->__('URL Key'),
  'title' => Mage::helper('cms')->__('URL Key'),
  'required' => true,
  'class' => '',
  'note' => Mage::helper('cms')->__('Relative to Website Base URL'),
  'disabled' => $isElementDisabled
));
```

This is the code responsible for javascript validator at admin CMS pages, which by default, accepts only English characters. This managed by adding a validate-identifier class to the related textfield. By commenting this line out, the admin can enter every character includes non-English characters.

And don't forget to clear the cache. Also if the compilation is enabled, run Compilation Process.
