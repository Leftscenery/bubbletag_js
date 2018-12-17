bubbletag_js
---

<br/>

BubbleTag is a js plugin uses for quick add bubble based tag.

---

#### Key Feature:
+ Quick Setup
+ Multiple events
+ Dynamic control
+ Multiple Holder
+ Sync tag holder

<br/>

---

#### Instruction:
+ Build container in HTML
<br>

```
<div class='containerName'></div>
<div class='containerName1'></div>
```

+  Add new gesture to element, **this** already bind to element by default 
```javascript
let newBubble = new BubbleTag({
        target:'containerName',    //Make specific class name to bubble tag holder
        items:['1','2','3'],     //init origin value
        allowRepeat: false,     //(Optional) Auto detect repeat content and block them
        validation: fn,     //(Optional) validation function, pass content as params, content only add when return true.
        onAdd: fn,      //(Optional) Callback event when Add complete
        onRemove: fn,   //(Optional) Callback event when Remove complete
    })
```

<br/>

---

#### Default Value:
+ **target**: null
+ **items**: []
+ **allowRepeat**: false
+ **validation**: null
+ **onAdd**: null
+ **onRemove**: null

<br/>

---

Feel free to let me know if there are any functions or parts need to be fixed :)
<br>By Jiawei Zhou 2018
