---
id: 104
title: "Extend Core Statistic System"
excerpt: "Adding new reports to the Statistics Dashboard"
published_date: "2013-04-28"
tags: ["concrete5"]
---

Concrete5 comes with a simple statistic system that can keep track of the number of visits in your site. If you enabled statistics (`Dashboard > System & settings > Statistics`), for every page view, Concrete5 will insert a record into the pageStatistics table. Looking at this table, you see it contains these fields:

```sql
cID: visited page id
date
timestamp
uID: default=0, user id, if a logged-in user visits the page
```

At the `Dashboard > Reports > Statistics`, you can only see the number of page views in the last 7 days. In this tutorial, I will show you how other reports, that use the inserted data, can be created for the statistic page.

**To add a list that showsthe top 10 most popular pages of your site on the statistics page:**

1. Tweaking Model: First, we add a method to the page statistics model. For this copy `/concrete/models/page_statistics.php` to `/models/page_statistics.php`. This will override the main file. Now add this method that runs a query, gets the data we need for our report:

```php
public static function getTotalPageViewsByPage() {
     $db = Loader::db();
     return $db->GetAll("select cID,count(pstID) AS num from PageStatistics GROUP BY cID HAVING num>0 ORDER BY num DESC LIMIT 10");
}
```

2. Tweaking Controller: copy `/concrete/controllers\dashboard/reports/statistics.php` to `/controllers\dashboard/reports/statistics.php`. This will override the main file. Now add this method that gets the required data from the method added in the previous step:

```php
public function view() {
        $this->addHeaderItem(Loader::helper('html')->javascript('jquery.visualize.js'));
        $this->addHeaderItem(Loader::helper('html')->css('jquery.visualize.css'));
        $this->setLatestPageViews();
        $this->setLatestPagesCreated();
        $this->setLatestRegistrations();
        $this->setDownloadStatistics();

        $this->set('totalVersions', PageStatistics::getTotalPageVersions());
        $this->set('totalEditMode', PageStatistics::getTotalPagesCheckedOut());

        $this->set('totalPageViewsByPage', PageStatistics::getTotalPageViewsByPage());
}
```

Note: this method was copied/pasted from `/concrete/core/controllers/single_pages/dashboard/reports/statistics.php`, I just added the last line.

3. Tweaking Single Page: copy `/concrete/single_pages/dashboard/reports/statistics.php` to `/single_pages/dashboard/reports/statistics.php`. This will override the main file. Now add this table at the end of the file, before the script tag, that prints data into the statistics single page:

```php
<?php
$value) {
        $p = Page::getByID($value['cID']); if(!$p->cIsSystemPage){
?>
```

Now go to the statistics, you should see a table listing the top 10 popular pages of your site.
