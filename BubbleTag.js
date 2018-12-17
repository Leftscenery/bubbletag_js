class TagItem {
    constructor(list, content, ele) {
        this.id = TagItem.findMax(list) + 1;
        this.content = content;
        this.ele = ele || [];
    }

    static findMax(list) {
        let max = 0;
        list.forEach(i => {
            max = i.id > max ? i.id : max;
        });
        return max;
    }
}

class BubbleTag {
    constructor(setting) {
        let str = '';

        this.tagList = [];
        this.target = document.getElementsByClassName(setting.target);
        this.allowRepeat = setting.allowRepeat || false;
        this.validation = setting.validation || null;
        this.onAdd = setting.onAdd || null;
        this.onRemove = setting.onRemove || null;

        str += `
        <input class="input" type="text" class="input" value="" placeholder="New Tag">
        `;

        //Build Container + Bind Data
        [...this.target].forEach(i => {
            i.classList.add('bubble-container');
            i.innerHTML = str;

            //Bind Input
            i.lastElementChild.onkeydown = (e) => {
                if (e.keyCode == 13) {
                    this.add(e.target.value);
                    e.target.value = '';
                }
            };

            i.lastElementChild.onblur = (e) => {
                e.target.value = '';
            };
        });

        // Init Data
        if (setting.items && setting.items.length) {
            setting.items.forEach(i => {
                this.add(i);
            })
        }

        return this
    }

    add(newItem) {
        if (newItem == '') {
            return;
        }

        if (!this.allowRepeat) {
            if (this.tagList.findIndex(i => i.content == newItem) >= 0) {
                return;
            }
        }

        if (this.validation && !this.validation(newItem)) {
            return;
        }

        let current = null;
        this.tagList.push(new TagItem(this.tagList, newItem));
        current = this.tagList[this.tagList.length - 1];

        // Insert
        [...this.target].forEach(t => {

            let tempItem = document.createElement('span');

            tempItem.classList.add('bubble-item');
            tempItem.innerHTML = `
            <span>${current.content}</span>
            <a data-id=${current.id} href="javascript:;">X</a>
        `;

            let input = t.lastElementChild;
            let newEle = t.insertBefore(tempItem, input);
            newEle.getElementsByTagName('a')[0].onclick = (e) => {
                e.preventDefault();
                this.remove(e.target.getAttribute('data-id'));
            };
            current.ele.push(newEle);

            //Animation
            let timer = setTimeout(() => {
                newEle.classList.add('animation');
                clearTimeout(timer);
            }, 0);

            tempItem = null;
        });
        this.onAdd && this.onAdd(newItem);
    }

    remove(id) {
        let content = '';
        this.tagList.find(i => i.id == id).ele.forEach(tag => {
            content ? null : content = tag;
            tag.classList.remove('animation');
            let timer = setTimeout(() => {
                tag.parentElement.removeChild(tag);
                clearTimeout(timer);
            }, 150);
        });

        this.tagList = this.tagList.filter(i => i.id != id);
        this.onRemove && this.onRemove(content);
    }

    clearAll(){
        this.tagList.forEach(i=>{
            this.remove(i.id);
        })
    }

    checkItem() {
        console.log(this.tagList);
    }

    getResult() {
        let result = [];
        this.tagList.forEach(i => {
            result.push(i.content);
        });
        return result;
    }
}