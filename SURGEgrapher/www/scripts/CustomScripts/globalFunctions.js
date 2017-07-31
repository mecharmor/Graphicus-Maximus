
//Back Button call
function backButton() {

    //Algebra Div
    $("#algebraPage").hide();
    //Trigonometry Div
    $("#trigonometryPage").hide();
    //Calculus Div
    $("#calculusPage").hide();
    //Graph Div
    $("#box").show();
    //Settings
    $("#settingsPage").hide();

    //Fixes back button glitch
    $('body').scrollTop(0);


}

//Keep menu in focus while scrolling
$().ready(function () {
    $(window).scroll(function () {
        $("#dragMenu").stop().animate({ "marginTop": ($(window).scrollTop()) }, "fast");
    });

    setTimeout(function() {
        $(".btn-info").each(function (index, elem) {
            katex.render(elem.innerHTML, elem);
        });
    }, 1000);
});

function txt2tex(txt) {
    // Variables
    const tree = createExpressionTree(txt.replace(/\s/g, ""));
    const latex = constructTree(tree);
    
    return latex;
    //return txt.replace(/(sin|cos|tan|csc|sec|cot|log|sinh|cosh|tanh|csch|sech|coth)/g, "\\$1 ").replace("(", "{").replace(")", "}");
}

function constructTree(tree) {
    if (typeof (tree) != "object")
        return tree;

    // Variables
    let str = "";

    if (typeof (tree[0]) == "object") {
        str = constructTree(tree[0]);
        return str;
    }
    switch (tree[0]) {
        case '+': {
            str = constructTree(tree[1]) + "+" + constructTree(tree[2]);
        } break;
        case '-': {
            str = constructTree(tree[1]) + "-" + constructTree(tree[2]);
        } break;
        case '*': {
            str = constructTree(tree[1]) + "\\cdot" + constructTree(tree[2]);
        } break;
        case '/': {
            str= "\\dfrac{" + constructTree(tree[1]) + "}{" + constructTree(tree[2]) + "}";
        } break;
        case '^': {
            str = constructTree(tree[1]) + "^{" + constructTree(tree[2]) + "}";
        } break;
        case '{': {
            str = "\\" + tree[1] + "{(" + constructTree(tree[2]) + ")}";
        } break;
        case '(': {
            if (tree[1] == undefined || tree[1]== null || tree[1]== "undefined") {
                str = "(" + constructTree(tree[2]) + ")";
            }
            else {
                str = constructTree(tree[1]) + "\\cdot(" + constructTree(tree[2]) + ")";
            }
        } break;
        default: {
            str = tree[0];
        }break;
    }

    return str;
}

function displayTree(tree) {
    // Variables
    let str = "[";
    
    for (let i = 0; i < tree.length; i++) {
        if (typeof (tree[i]) == "object")
            str += displayTree(tree[i]);
        else
            str += tree[i];
        if (i < tree.length - 1) {
            str += ", ";
        }
    }

    return str + "]";
}

function getPrecedence(op) {
    switch (op) {
        default:
            return 0;
        case '+':
        case '-':
            return 2;
        case '/':
        case '*':
            return 3;
        case '^':
            return 4;
    }
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function createExpressionTree(txt) {
    // Variables
    let tree = [];
    let operatorStack = [];
    let funcStack = [];
    
    function doBinary(op) {
        // Variables
        let right = tree.pop();
        let left = tree.pop();

        tree.push([op, left, right]);
    }

    for (let i = 0; i < txt.length; i++) {
        switch (txt[i]) {
            case '+':
            case '-':
            case '*':
            case '/':
                // Variables
                let prec = getPrecedence(txt[i]);

                while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                    doBinary.call(this, operatorStack.pop());
                }
                operatorStack.push(txt[i]);

                break;
            case '(':
            case '{':
                operatorStack.push(txt[i]);
                break;
            case ')':
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] != '(') {
                    doBinary.call(this, operatorStack.pop());
                }
                operatorStack.pop();
                break;
            case '}':
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] != '(') {
                    doBinary.call(this, operatorStack.pop());
                }
                break;
            default:
                if (txt[i] == '^' && txt[i] != '(') {
                    // Variables
                    let prec = getPrecedence(txt[i]);

                    while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                        doBinary.call(this, operatorStack.pop());
                    }
                    operatorStack.push(txt[i]);
                    break;
                }

                // Variables
                const n = i;
                let parenth = false;

                while (i < txt.length) {
                    if (!txt[i].match(/\w/)) {
                        if (txt[i] == '(')
                            parenth = true;
                        break;
                    }
                    i++;
                }
                // Variables
                let str = txt.substring(n, i--);

                // If there was a parenthesis at the end of this operand, then
                // find if it is a function of some kind
                if(parenth) {
                    // Variables
                    let funcName = "";
                    let c = 0;

                    // Reverse searches bro :sunglasses: :+1:
                    for (let a = str.length - 1; a >= 0; a--) {
                        funcName = str[a] + funcName;
                        if (funcs.indexOf(funcName) != -1) {
                            for (let b = i + 2; b < txt.length; b++) {
                                if (txt[b] == '(') c++;
                                if (txt[b] == ')' && c == 0) {
                                    txt = replaceAt(txt, i + 1, '{');
                                    txt = replaceAt(txt, b, '}');
                                    break;
                                }
                                else if (txt[b] == ')') {
                                    c--;
                                }
                            }
                        }
                    }
                }
                else {
                    str = str.replace(/(sin|cos|tan|csc|sec|cot|sinh|cosh|tanh|csch|sech|coth|log|ln)/g, "\\$1 ");
                }

                tree.push(str);
                break;
        }
    }

    while (operatorStack.length > 0) {
        doBinary.call(this, operatorStack.pop());
    }

    return tree;
}

const funcs = [
    "sin", "cos", "tan",
    "csc", "sec", "cot",
    "sinh", "cosh", "tanh",
    "csch", "sech", "coth",
    "log", "ln", "^"
];