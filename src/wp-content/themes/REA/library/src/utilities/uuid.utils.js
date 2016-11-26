class UUIDUtils {
  static decimalToHexadecimal(decimal) {
    let hexadecimal = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    return hexadecimal[decimal]
  }

  static x(number) {
    let s = [];
    for (let i = 0; i < number; i++) {
      s.push(this.decimalToHexadecimal(Math.random()*15|0))
    }
    return s.join("")
  }

  static y() {
    return this.decimalToHexadecimal(Math.random()*4|0+8)
  }

  static generate() {
    return `${this.x(8)}-${this.x(4)}-4${this.x(3)}-${this.y()}${this.x(3)}-${this.x(12)}`
  }
}

export default UUIDUtils;
