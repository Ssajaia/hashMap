import LinkedList from "./linkedList.js";

class HashMap {
    constructor(loadfactor = 0.75, size = 16) {
        this.loadfactor = loadfactor;
        this.buckets = Array.from({length: size}, () => new LinkedList());
        this.size = size;
        this.totalPairs = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primenumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primenumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        this.checkLoad();
        let index = this.hash(key);
        let bucket = this.buckets[index];
        if(bucket.contains(key) == true) {
            let node = bucket.at(bucket.find(key));
            node.value = value;
            console.log(bucket);
            return;
        }
        bucket.append(key, value);
        this.totalPairs++;
        console.log(bucket);
    }

    get(key) {
        let bucketIndex = this.hash(key);
        let bucket = this.buckets[bucketIndex];
        let current = bucket.head; 
        while(current !== null) {
            if (current.key == key) {
                return current.value;
            }
            current = current.nextNode;
        }
        return null;
    }

    has(key) {
        if(this.get(key) !== null)
            return true;
        else
            return false;
    }

    remove(key) {
        if (this.get(key) !== null) {
            let bucketIndex = this.hash(key);
            let bucket = this.buckets[bucketIndex];
            bucket.removeAt(bucket.find(key));
            this.totalPairs--;
            return true;
        } else {
            return false;
        }
    }

    checkLoad() {
        if((this.totalPairs / this.size) >= this.loadfactor) {
            console.log(this.totalPairs / this.size + " - Load reached maximum threshold, increasing the size....");
            this.increaseSize();
        } else {
            console.log(this.totalPairs / this.size + " - Optimal Load");
        }
    }

    increaseSize() {
        let oldBuckets = this.buckets;
        let newSize = this.size * 2;
        this.size = newSize;
        this.buckets = Array.from({length: newSize}, () => new LinkedList());
        for (const bucket of oldBuckets) {
            let temp = bucket.getHead();
            while (temp !== null) {
                let index = this.hash(temp.key);
                let newBucket = this.buckets[index];
                newBucket.append(temp.key, temp.value);
                temp = temp.nextNode;
            }
        }
        console.log("size increased to " + this.buckets.length);        
    }

    length() {
        return this.totalPairs;
    }

    clear() {
        this.buckets = Array.from({length: this.size}, () => new LinkedList());
        this.loadfactor = 0.75;
        this.size = 16;
        this.totalPairs = 0;
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.size; i++) {
            let bucket = this.buckets[i];
            let temp = bucket.head;
            while(temp !== null) {
                keys.push(`${temp.key}`);
                temp = temp.nextNode;
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (let i = 0; i < this.size; i++) {
            let bucket = this.buckets[i];
            let temp = bucket.head;
            while(temp !== null) {
                values.push(`${temp.value}`);
                temp = temp.nextNode;
            }
        }
        return values;
    }

    entries() {
        let allEntries = [];
        let keys = this.keys();
        let values = this.values();
        for (let i = 0; i < this.totalPairs; i++) {
            let entry = [`${keys[i]}, ${values[i]}`];
            allEntries.push(entry);
        }
        return allEntries;
    }
}

export default HashMap;