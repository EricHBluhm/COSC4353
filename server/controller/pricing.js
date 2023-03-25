class Pricing {
    constructor(gallonsRequested,address,date,sugPrice,due)
    {
        this.gallonsRequested = gallonsRequested,
        this.address = address,
        this.date = date,
        this.sugPrice = sugPrice,
        this.due = due
    }

    get Price(){
        return this.calcPrice();
    }

    calcPrice() {
       let amtDue = 100/this.gallonsRequested;
       return amtDue; 
    }

}



