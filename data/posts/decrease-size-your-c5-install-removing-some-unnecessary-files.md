---
id: 103
title: "Reduce size of your concrete5 install by removing some unnecessary files"
excerpt: "Making your concrete5 installation 32% lighter by removing some unnecessary files from your project folder"
published_date: "2013-03-26"
tags: ["concrete5", "PHP"]
---

concrete5 default installation size, right after install a fresh copy, is about 31MB. Many developers prefer to have a lighter version of projects, for so many reasons. My reason for making every installation lighter is to make commiting the source and also backup/restore files faster.

This list contains files and folders you can remove safely from your project because they are rarely used and only in special cases, but before any action, make sure you won't need them in the future. Also, I just list files that have considerable size, not files that removing does not affect the overall size too much. You can reduce the overall size by about 32% by deleting them:

1. Secureimage (used for captcha) audio files, 72 `mp3` and `wav` files with 1MB. Delete them if you do not have any plans for using sound captcha.
   location: `/concrete/libraries/3rdparty/securimage/audio/`

2. Zend Local data files, there are 476 `xml` files with over 8MB.
   General files that are needed are:
   `en.xml`, `en_US.xml`, `en_GB.xml`, `metazoneInfo.xml`, `root.xml`, `supplementalData.xml`, `telephoneCodeData.xml`,`Translation.php`.
   And keep 2 xml files for every language/country you are using, e.g. for French keep `fr.xml` and `fr_FR.xml`. Rest of the files, remove them.
   locationt: `/concrete/libraries/3rdparty/Zend/Locale/Data/`

3. Adodb other than mysql driver files, 53 files with 0.5 MB. Delete them if you do not have plans for connecting to any database other than mysql.
   Keep `adodb-mysql.inc.php`, `adodb-mysqli.inc.php`, `adodb-mysqlpo.inc.php`, `adodb-mysqlt.inc.php`, `adodb-pdo_mysql.inc.php`.
   And you can delete the rest of the files in this folder.
   location : `/concrete/libraries/3rdparty/adodb/drivers/`

4. Adodb doc files, 11 files, 620KB
   Location: `/concrete/libraries/3rdparty/adodb/docs/`

5. JSON library document files, 23 files, 134KB
   Location: `/concrete/libraries/3rdparty/JSON/doc/`
