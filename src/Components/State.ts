import { Listener } from "../Types/Listener.js";

export class State<T> {
    protected listeners: Listener<T> [] = [];

     //Add listener to the global array listener state
     addListener(listenerFn:Listener<T>){
        this.listeners.push(listenerFn);
    }
}