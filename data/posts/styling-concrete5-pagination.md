---
id: 105
title: "Styling the concrete5 Pagination"
excerpt: "Style your concrete5 pagination with Bootstrap, Foundation4 Frameworks "
published_date: "2013-09-01"
tags: ["concrete5"]
---

If you had used CSS Frameworks like Bootstrap and Foundation4, you might have noticed that the default pagination tags most frameworks use are `ul` and `li` tags. But Concrete5 by default renders pagination code by `span` tag. Also, Concrete5 does not generate `a` tag with `href=#` attribute for the current pages, so it may become a challenge to produce a neat pagination widget styled with Bootstrap or Foundation. For doing so, open your `page_list` block template, and find where these codes reside:

```
<?php  if ($showPagination): ?>
    <div id="pagination">
        <div class="ccm-spacer"></div>
        <div class="ccm-pagination">
            <span class="ccm-page-left"><?php  echo $paginator->getPrevious('« ' . t('Previous')) ?></span>
            <?php  echo $paginator->getPages() ?>
            <span class="ccm-page-right"><?php  echo $paginator->getNext(t('Next') . ' »') ?></span>
        </div>
    </div>
<?php  endif; ?>
```

And replace this chunk of code with:

```
<?php  if ($showPagination):?>
    <div id="pagination">
        <div class="pagination">
        <ul class="pagination">
            <li><?php  echo $paginator->getPrevious('« ' . t('Previous'), 'a') ?></li>
            <?php  echo $paginator->getPages('li') ?>
            <li><?php  echo $paginator->getNext(t('Next') . ' »', 'a') ?></li>
        </ul>
        </div>
    </div>
<?php  endif; ?>
```

Now you should be all good with both `Bootstrap` and `Foundation4`. The only issue with this code for `Foundation4` users is that this does not highlight the current page. To solve this, add this code at line 2 after `if ($showPagination):`

```
<?php
$paginator->classCurrent='current';
?>
```
