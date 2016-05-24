/**
 * Created by Administrator on 2016/5/24.
 */
define([], function () {
    //�Ա�
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
                break;
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
                break;
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
                break;
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
                break;
            default:
                return options.inverse(this);
                break;
        }
    });
    //��ѧ����
    Handlebars.registerHelper("math", function(v1, operator, v2){
        if(operator == "+"){	return v1+v2;}
        if(operator == "-"){	return v1-v2;}
        if(operator == "*"){	return v1*v2;}
        if(operator == "/"){	return v1/v2;}
        if(operator == "%"){	return v1%v2;}
    });
});