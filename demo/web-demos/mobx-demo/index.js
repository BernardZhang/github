import React from 'react'
import ReactDOM from 'react-dom'
import { Reaction, observable, toJS, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react-lite';

const data = observable({
    name: 'zhangsan',
    age: 18
})

const print = (data) => {
    console.log('print...', data.name, data.age);
}

const reaction = new Reaction('test', () => {
    console.log('reaction callback...', `${data.name} ${data.age}`);
});


reaction.track(() => {
    // console.log('track....', data)
    // print(toJS(data))
    print(data)
})


runInAction(() => {
    data.name = 'runInAction'
    // data.age = 24
})

runInAction(() => {
    // data.name = 'LiSi'
    data.age = 20
})


setTimeout(() => {
    runInAction(() => {
        data.name = 'setTimeout'
    })
})

console.log(toJS(data))

autorun(() => {
    console.log('autorun...')
    print(data)
})

const UserInfo = observer(({ user }) => <><h3>{user.name}</h3><p>{user.age}</p></>)

ReactDOM.createRoot(
    <UserInfo user={data} />,
    document.body
)
