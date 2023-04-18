const localStorageKeyName='tagList';
// import cId from '@/lib/createId';
import {nanoid} from 'nanoid';


type tags={
    id:string,
    name: string
}

type tagListItem={
    data:tags[],
    fetch:()=> tags[],
    create:(name:string)=>string,
    update:(id:string,name:string)=>'success' | 'not found' | 'duplicated',
    remove:(id:string)=>boolean,
    save:()=>void
}

const tagListModel:tagListItem={
    data:[],

    fetch(){
        this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name: string){
        const tagName=this.data.map((item)=>item.name)
        if (tagName.indexOf(name) >= 0) {
            throw new Error('duplicated')
            return 'duplicated';
        }
        const tagId=(nanoid()).toString();
        const tag={id:tagId,name:name}
        this.data.push(tag);
        this.save();
        return 'success';
    },
    update(id:string,name:string){
        const tag=this.data.filter((item)=>{
           if(item.id===id){
               item.name=name
           }
       });
        // console.log(tag)
        this.save();
        return 'success'
    },
    remove(id:string){
        for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].id===id)
            {
                this.data.splice(i, 1);
                console.log(i);
                this.save();
                return true;
            }
        }
        return false;
    },
    save(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }
}
export default tagListModel;