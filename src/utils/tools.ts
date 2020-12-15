export class Tools {
  constructor() {}

  /**
   * @description 检测字符串
   */
  checkType() {
    const rules = {
      email(str) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      },
      mobile(str) {
        return /^1[1-9][0-9]{9}$/.test(str);
      },
      tel(str) {
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      },
      number(str) {
        return /^[0-9]$/.test(str);
      },
      english(str) {
        return /^[a-zA-Z]+$/.test(str);
      },
      text(str) {
        return /^\w+$/.test(str);
      },
      chinese(str) {
        return /^[\u4E00-\u9FA5]+$/.test(str);
      },
      lower(str) {
        return /^[a-z]+$/.test(str);
      },
      upper(str) {
        return /^[A-Z]+$/.test(str);
      },
    };
    return {
      check(str, type) {
        if (rules[type]) {
          return rules[type](str);
        } else {
          new Error('错误');
        }
      },
      addRule(type, fn) {
        rules[type] = fn;
      },
    };
  }
  /**
   * 时间格式化
   * @param date
   * @param fmt
   */
  public formatDate(date: any, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let _date = new Date(date),
      _fmt = fmt;
    const o = {
      'M+': _date.getMonth() + 1, // 月份
      'd+': _date.getDate(), // 日
      'h+': _date.getHours(), // 小时
      'm+': _date.getMinutes(), // 分
      's+': _date.getSeconds(), // 秒
    };
    if (/(y+)/.test(_fmt)) {
      _fmt = _fmt.replace(
        RegExp.$1,
        (_date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(_fmt)) {
        _fmt = _fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length),
        );
      }
    }
    return _fmt;
  }
}
