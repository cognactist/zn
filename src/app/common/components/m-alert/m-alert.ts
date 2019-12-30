

export class MAlert {
  constructor(
    public id: string = "",//id
    public title: string = "",//名称 check查看page分页form表单
    public type: string = "",//弹出框类型
    public data1:any="",
    public data2:any=""
  ) {
    
  }
  public clear(){
    this.id="";
    this.title="";
    this.type="";
    this.data1=""
    this.data2=""
  }
 
}

