---
layout: layouts/base
share: "true"
title: The Library
tags:
  - menu
cssclasses:
  - cards
---


```dataview
TABLE WITHOUT ID
	"![|60](" + cover + ")" as Cover,
	link(file.link, title) as Title,
	author as Author,
	rating as Rating,
	status as Status
FROM "library/litnotes"
SORT status DESC, file.ctime ASC
```


