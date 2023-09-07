<!-- <template>
  <div class="container">
    <div v-for="(item, idx) in lists" :key="item.id">
      <div class="col" @drop.prevent="onDrop($event, idx)" @dragover.prevent>
        <div
          class="box"
          v-for="(numItem, idx) in item.numberList"
          :key="idx"
          draggable="true"
          @dragstart="startDrag($event, numItem)"
        >
          <p>{{ numItem.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="disp">
    <hr />
    <div>data: {{ lists }}</div>
    <hr />
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [
        { id: 1, numberList: [{ content: 4 }, { content: 7 }] },
        {
          id: 2,
          numberList: [
            { content: 2 },
            { content: 5 },
            { content: 8 },
            { content: 6 },
            { content: 1 }
          ]
        },
        { id: 3, numberList: [{ content: 3 }, { content: 9 }] }
      ],
      done: [
        { id: 1, numberList: [{ content: 1 }, { content: 4 }, { content: 7 }] },
        { id: 2, numberList: [{ content: 2 }, { content: 5 }, { content: 8 }] },
        { id: 3, numberList: [{ content: 3 }, { content: 6 }, { content: 9 }] }
      ],
      sucess: ''
    }
  },
  methods: {
    startDrag(ev, item) {
      ev.dataTransfer.setData('some', item.content)
    },
    onDrop(ev, colNum) {
      const selectedItem = ev.dataTransfer.getData('some') * 1
      // 리스트에서 선택된 아이템과 같은 content 값을 가진 요소를 찾아 index를 반환
      let targetIdx, targetItem
      this.lists.forEach((obj, index) => {
        obj.numberList.forEach((ob) => {
          if (ob.content === selectedItem) {
            targetIdx = index
            targetItem = ob
          }
        })
      })
      // drop이 된 <div> index를 받아 리스트에 추가
      this.lists[colNum].numberList.push(targetItem)
      this.lists[targetIdx].numberList.splice(
        this.lists[targetIdx].numberList.indexOf(targetItem),
        1
      )
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  width: 512px;
  margin: 32px auto;
  justify-content: center;
}
.col {
  display: flex;
  height: 500px;
  width: 150px;
  background-color: #fff;
  border: 4px solid lightgray;
  margin-left: 5px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
}
.box {
  width: 130px;
  height: 50px;
  color: #fff;
  background-color: lightskyblue;
  margin-top: 10px;
  border-radius: 5px;
}
</style> -->
<template>
  <div class="outer">
    <div class="container">
      <div v-for="(item, idx) in lists" :key="item.id">
        <div
          class="col"
          @drop.prevent="onDrop($event, idx)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div
            v-for="(numItem, idx) in item.numberList"
            :key="idx"
            class="box"
            @dragstart="
              startDrag($event, numItem) // , item.id)
            "
            draggable="true"
          >
            <p>{{ numItem.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="disp">
      <hr />
      <div v-if="success" class="good">성공!!</div>
      <div v-if="!success">data: {{ lists }}</div>
      <hr />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoveTest',
  data() {
    return {
      success: '',

      done: [
        { id: 1, numberList: [{ content: 1 }, { content: 4 }, { content: 7 }] },
        { id: 2, numberList: [{ content: 2 }, { content: 5 }, { content: 8 }] },
        { id: 3, numberList: [{ content: 3 }, { content: 6 }, { content: 9 }] }
      ],

      lists: [
        {
          id: 1,
          numberList: [{ content: 4 }, { content: 1 }, { content: 2 }]
        },
        {
          id: 2,
          numberList: [
            { content: 3 },
            { content: 8 },
            { content: 5 },
            { content: 6 }
          ]
        },
        {
          id: 3,
          numberList: [{ content: 7 }, { content: 9 }]
        }
      ]
    }
  },
  watch: {
    lists: {
      immediate: false,
      deep: true,
      handler() {
        const col = document.querySelectorAll('.col')
        const dd = JSON.stringify(this.done)
        const ll = JSON.stringify(this.lists)
        if (dd === ll) {
          console.log('성공!')
          this.success = true
          for (const c of col) c.classList.add('good')
        } else {
          console.log('틀림')
          this.success = false
          for (const c of col) c.classList.remove('good')
        }
      }
    }
  },
  methods: {
    startDrag(event, item) {
      // event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move' // 마우스 표시없음
      event.dataTransfer.setData('selectedItem', item.content)
    },
    onDrop(event, colNum) {
      const selectedItem = Number(event.dataTransfer.getData('selectedItem'))

      // 리스트에서 선택된 아이템과 같은 content 값을 가진 요소를 찾아 index를 반환한다.
      let targetIdx
      let targetItem
      this.lists.forEach((obj, index) => {
        obj.numberList.forEach((ob) => {
          if (ob.content === selectedItem) {
            targetIdx = index
            targetItem = ob
          }
        })
      })

      // drop이 된 <div> index(=colNum)를 받아 리스트에 추가한다.
      // 기존 리스트에서는 요소를 삭제한다. (splice() 사용)
      this.lists[colNum].numberList.push(targetItem)
      this.lists[targetIdx].numberList.splice(
        this.lists[targetIdx].numberList.indexOf(targetItem),
        1
      )
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  width: 512px;
  margin: 32px auto;
  justify-content: center;
}
.outer {
  display: inline-block;
  text-align: center;
}
.disp {
  width: 512px;
}

.col {
  display: flex;
  height: 500px;
  width: 150px;
  background-color: #fff;
  border: 4px solid lightgray;
  margin-left: 5px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
}
.good {
  background-color: rgba(236, 240, 187, 0.588);
}
.box {
  width: 130px;
  height: 50px;
  color: #fff;
  background-color: lightskyblue;
  margin-top: 10px;
  border-radius: 5px;
}
p {
  text-align: center;
  line-height: center;
  color: white;
}
</style>
