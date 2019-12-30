

export class User {
    constructor(
        public name: string = "",
        public phone: string = "",
        public timeStart: string = "",
        public timeEnd: string = "",
        public forbid: string = "",
        public forbidReason: string = ""
    ) { }

    public clearUser() {
        this.name = "",
            this.phone = "",
            this.timeStart = "",
            this.timeEnd = "",
            this.forbid = "",
            this.forbidReason = ""
    }
}

