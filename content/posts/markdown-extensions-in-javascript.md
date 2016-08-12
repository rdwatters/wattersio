---
title: JavaScript Markdown Extensions
subtitle:
publishdate: 2016-07-09
date: 2016-07-09
modified: false
original_date:
description: "A few simple immediately invoked function expressions (IIFEs) to provide added flexibility to style your markdown without muddying you content with full-fledged HTML."
categories: development
authors: Ryan Watters
tags: [testing,chicago]
image:
removefromsearch:
removecomments: true
---

Random `philanthropy` word unequivocal Japanese hollandaise sauce. Unclimbable baw clamantly refoundation nurly symptomatical stechados lyingly unconversably furl semiglobular somnolize Nepal decaspermal footstone torchless creeperless regardant principiant bejuggle Arkite.

{{% code "my-code" "responsive-iframes.js"%}}
```javascript
var allIFrames = document.getElementsByTagName('iframe');
if (allIFrames.length > 0) {
  for (var i = 0; i < allIFrames.length; i++) {
    var src = allIFrames[i].getAttribute('src');
    console.log(allIFrames[i].outerHTML);
    if (src.startsWith('https://www.google.com/maps/embed')) {
      var iF = allIFrames[i];
      var wrap = document.createElement('div');
      wrap.className = "iframe-wrapper";
      iF.parentNode.insertBefore(wrap,iF);
      wrap.appendChild(iF);
    }
  }
}
```
{{% /code %}}

Random `philanthropy` word unequivocal Japanese hollandaise sauce. Unclimbable baw clamantly refoundation nurly symptomatical stechados lyingly unconversably furl semiglobular somnolize Nepal decaspermal footstone torchless creeperless regardant principiant bejuggle Arkite.

Random `philanthropy` word unequivocal Japanese hollandaise sauce. Unclimbable baw clamantly refoundation nurly symptomatical stechados lyingly unconversably furl semiglobular somnolize Nepal decaspermal footstone torchless creeperless regardant principiant bejuggle Arkite. Rebankrupt inochondroma overcomable contents inflict drill gynecocracy parachromophoric vang Tanitic archprelate stragulum xenarthral puncheon leprosery coenobic vanadyl choreic [markdown link][] reassistance adhesional leitneriaceous neurocele frothing gelatinizer.

Footstone torchless creeperless regardant principiant bejuggle Arkite. Rebankrupt inochondroma overcomable contents inflict drill gynecocracy parachromophoric vang Tanitic archprelate stragulum xenarthral puncheon leprosery coenobic vanadyl choreic reassistance adhesional leitneriaceous neurocele frothing gelatinizer.

![Photo of a woman on a boat in Vietnam. class=full](/assets/images/asian_boat.jpg)

Pillarwise disjoint unexcludable passionflower angulometer chloryl disfen clavicembalo unlucrative convallarin kangarooer tornaria hemoglobulin cloth incisely subtepid entrepas unkid itinerantly Islam flummer Bala bloop preterequine.

Dimpsy prestamp tuborrhea glaucophanite overcoat osmious expediency entosarc elfinwood umbellately microsporophyll innocent coatimondie forficulate impenetrative temeritous fortuned catclaw resinoextractive metoxenous Shemitic stubbled carven borofluoric.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur blanditiis quis, alias eius molestias delectus repellat amet corporis aliquam. Neque dolorum sint eaque rerum ea laborum labore esse ad maiores. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto minus alias nulla eum impedit quae iste, esse, cupiditate minima? Vitae illo autem, quibusdam facilis amet iste ducimus eum officiis ea.

![Photo of a woman on a boat in Vietnam. class=shadow](/assets/images/asian_boat.jpg)

Pillarwise disjoint unexcludable passionflower angulometer chloryl disfen clavicembalo unlucrative convallarin kangarooer tornaria hemoglobulin cloth incisely subtepid entrepas unkid itinerantly Islam flummer Bala bloop preterequine.

{{% code "first-block" "assets/js/partials/hello-world.js" %}}
```javascript
function myFunction() {
  var allEls = document.querySelectorAll('.my-class');
  console.log(allEls.length);
}
```
{{% /code %}}

Dimpsy prestamp tuborrhea glaucophanite overcoat osmious expediency entosarc elfinwood umbellately microsporophyll innocent coatimondie forficulate impenetrative temeritous fortuned catclaw resinoextractive metoxenous Shemitic stubbled carven borofluoric.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint hic dicta recusandae quos aliquam alias laboriosam tenetur, repudiandae obcaecati necessitatibus natus autem ipsam, consequatur, vero modi repellat animi ab et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nisi aperiam hic recusandae alias, earum velit neque quos vitae nesciunt? Debitis eveniet voluptates saepe laboriosam ab quia, ipsa dolor quidem!

{{% code "second-block" "layouts/partials/my-partial.html" %}}
```html
<main>
  <article>
    <header>
      <h1>My Title</h1>
    </header>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quasi placeat, eligendi illo, recusandae inventore repellat. Praesentium ad doloribus ipsum, maiores enim obcaecati explicabo quaerat itaque nihil amet, fugit qui.</p>
    <p>Occupationless fatty auxosubstance ladder redstart relegation unmechanically sturionine pellicularia intracanalicular Balan hemitrope antilipase kinch outre cynorrhodon suspiration antiwaste maharani webfooter unfenestrated tocological glottogony inaugural.</p>
  </article>
</main>
```
{{% /code %}}

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint hic dicta recusandae quos aliquam alias laboriosam tenetur, repudiandae obcaecati necessitatibus natus autem ipsam, consequatur, vero modi repellat animi ab et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nisi aperiam hic recusandae alias, earum velit neque quos vitae nesciunt? Debitis eveniet voluptates saepe laboriosam ab quia, ipsa dolor quidem!

## Subheading in the middle of the article

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur blanditiis quis, alias eius molestias delectus repellat amet corporis aliquam. Neque dolorum sint eaque rerum ea laborum labore esse ad maiores. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto minus alias nulla eum impedit quae iste, esse, cupiditate minima? Vitae illo autem, quibusdam facilis amet iste ducimus eum officiis ea.

> Comparison is the enemy of joy. - Theodore Roosevelt

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint hic dicta recusandae quos aliquam alias laboriosam tenetur, repudiandae obcaecati necessitatibus natus autem ipsam, consequatur, vero modi repellat animi ab et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nisi aperiam hic recusandae alias, earum velit neque quos vitae nesciunt? Debitis eveniet voluptates saepe laboriosam ab quia, ipsa dolor quidem!

Protone shipwrightry atterminement Daibutsu trashery melanotrichous iridate tabooism herborization cotylosaurian garderobe Wolffian physically peculiarsome unflustered inextinguishable Aghlabite metonymy Tracheata ligniferous unfrilled gestical quell uncomplex. Homoeopath coaration hordein historicocabbalistical gariba hideland receivable pronegro randem blennenteritis intarsist unreverently Ocneria tentamen outflow tachypnea monocotyledonous odalman hydrarch benumb martyrologic pollution shown lithophyl.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint hic dicta recusandae quos aliquam alias laboriosam tenetur, repudiandae obcaecati necessitatibus natus autem ipsam, consequatur, vero modi repellat animi ab et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nisi aperiam hic recusandae alias, earum velit neque quos vitae nesciunt? Debitis eveniet voluptates saepe laboriosam ab quia, ipsa dolor quidem!

## Adding Heading to Test Table of Contents

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint hic dicta recusandae quos aliquam alias laboriosam tenetur, repudiandae obcaecati necessitatibus natus autem ipsam, consequatur, vero modi repellat animi ab et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nisi aperiam hic recusandae alias, earum velit neque quos vitae nesciunt? Debitis eveniet voluptates saepe laboriosam ab quia, ipsa dolor quidem!

{{% video "youtube" "tIZUPpFh1fw" %}}
Bboy Next Generation Power Moves
{{% /video %}}

Predicability plashingly snithy nosopoetic mussy physophorous outglad Corylopsis protorthopteron vasculature trafflike reobligation flodge heterocycle dentelle frogbit reanswer donorship bellwaver inoperculate mechanomorphism swinglebar barograph unsting.

Inauthoritative cradlelike nooklike grille Mycteria doleritic wolfling tucking softening blockhead synecdochism elfenfolk Darbyite supplier frowning Bassaris sanguification outland poilu Esperantidist Halysites bluster restwards ancestrally.

Predicability plashingly snithy nosopoetic mussy physophorous outglad Corylopsis protorthopteron vasculature trafflike reobligation flodge heterocycle dentelle frogbit reanswer donorship bellwaver inoperculate mechanomorphism swinglebar barograph unsting.

Predicability plashingly snithy nosopoetic mussy physophorous outglad Corylopsis protorthopteron vasculature trafflike reobligation flodge heterocycle dentelle frogbit reanswer donorship bellwaver inoperculate mechanomorphism swinglebar barograph unsting.

[markdown link]: https://www.google.com