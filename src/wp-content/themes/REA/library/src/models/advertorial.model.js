class AdvertorialModel {
  constructor(fields={}) {
    this.fields = fields;
  }

  getConfig() {
    return {
      "type": this.fields.type || "",
      "site": this.fields.site || "",
      "sz": this.fields.sz || "",
      "auto-hide": this.fields.autoHide || ""
    };
  }

  getParams() {
    return {
      "platform": this.fields.platform || "",
      "channel": this.fields.channel || "",
      "cat": this.fields.cat || "",
      "subCategory": this.fields.subCategory || "",
      "sect": this.fields.sect || "",
      "brand": this.fields.brand || "",
      "pos": this.fields.pos || "",
      "author": this.fields.author || "",
      "postname": this.fields.postname || ""
    };
  }

  getModel() {
    return {
      "config": this.getConfig(),
      "params": this.getParams()
    };
  }
}

export default AdvertorialModel;
