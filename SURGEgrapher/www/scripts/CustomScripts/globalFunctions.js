
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

// Converts from text to LaTeX
function txt2tex(txt) {
    // Variables
    const tree = createExpressionTree(txt.replace(/\s/g, ""));
    const latex = constructTree(tree);
    
    return latex;
}

// Constructs the binary expression tree
function constructTree(tree) {
    if (typeof (tree) != "object")
        return tree;

    // Variables
    let str = "";

    // This is usually the root
    if (typeof (tree[0]) == "object") {
        str = constructTree(tree[0]);
        return str;
    }
    switch (tree[0]) {
        case '+': {
            str = constructTree(tree[1]) + " + " + constructTree(tree[2]);
        } break;
        case '-': {
            str = constructTree(tree[1]) + " - " + constructTree(tree[2]);
        } break;
        case '*': {
            str = constructTree(tree[1]) + " \\cdot " + constructTree(tree[2]);
        } break;
        case '/': {
            str= " \\dfrac{" + constructTree(tree[1]) + "}{" + constructTree(tree[2]) + "} ";
        } break;
        case '^': {
            str = constructTree(tree[1]) + "^{" + constructTree(tree[2]) + "} ";
        } break;
        case '{': {
            str = " \\" + tree[1] + "{(" + constructTree(tree[2]) + ")} ";
        } break;
        case "()": {
            str = " (" + constructTree(tree[1]) + ") ";
        } break;
        default: {
            str = tree[0];
        }break;
    }

    return str;
}

// Displays the tree, this is for debug reasons only
function displayTree(tree, index) {
    // Variables
    let str = "[";

    if (!index)
        index = 0;

    switch (index % 3) {
        case 0: str = ' [ '; break;
        case 1: str = ' { '; break;
        case 2: str = ' ( '; break;
    }
    
    for (let i = 0; i < tree.length; i++) {
        if (typeof (tree[i]) == "object")
            str += displayTree(tree[i], index + 1);
        else
            str += tree[i];
        if (i < tree.length - 1) {
            str += ", ";
        }
    }
    switch (index % 3) {
        case 0: str += ' ] '; break;
        case 1: str += ' } '; break;
        case 2: str += ' ) '; break;
    }

    return str;
}

function isSpecialChar(c) {
    switch (c) {
        case '(':
        case '+':
        case '*':
        case '/':
        case '^':
        case '{':
            return true;
    }

    return false;
}

function getPrecedence(op) {
    switch (op) {
        case '+':
        case '-':
            return 1;
        case '/':
        case '*':
            return 2;
        case '^':
            return 3;
        case '{':
            return 4;
        default:
            return 0;
    }
}

// Replaces the given index in the string. Basically (str[index]= replacement)
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function createExpressionTree(txt) {
    // Variables
    let tree = [];
    let operatorStack = [];
    let txtIndex = -1;

    function doBinary(op) {
        // If it is a parenthesis, then only have it as ["()", operand]
        if (op == "()") {
            // Variables
            let all = tree.pop();

            tree.push([op, all]);
            return;
        }
        // Variables
        let right = tree.pop();
        let left = tree.pop();
        
        tree.push([op, left, right]);
    }

    // Makes sure that )( multiplies, but not )- kind of thing
    do {
        txtIndex = txt.indexOf(')', txtIndex + 1);
        if (txtIndex>= 0 && txtIndex != txt.length - 1) {
            switch (txt[txtIndex + 1]) {
                case '+':
                case '-':
                case '*':
                case '/':
                case '^':
                case ')':
                    break;
                default:
                    txt = (txt.substring(0, txtIndex + 1) + "*" + txt.substring(txtIndex + 1));
                    break;
            }
        }
    } while (txtIndex != -1 && txtIndex< txt.length);

    for (let i = 0; i < txt.length; i++) {
        switch (txt[i]) {
            case '(':
            case '{':
                operatorStack.push(txt[i]);
                break;
            case ')':
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] != '(') {
                    doBinary.call(this, operatorStack.pop());
                }
                //operatorStack.push(txt[i]);
                operatorStack.pop();
                doBinary.call(this, "()");
                break;
            case '}':
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] != '{') {
                    doBinary.call(this, operatorStack.pop());
                }
                break;
            case '+':
            case '*':
            case '/':
                // Variables
                let prec = getPrecedence(txt[i]);

                while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                    doBinary.call(this, operatorStack.pop());
                }
                operatorStack.push(txt[i]);

                break;
            case '-':
                if (i > 0 && !isSpecialChar(txt[i - 1])) {
                    // Variables
                    let prec = getPrecedence(txt[i]);

                    while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                        doBinary.call(this, operatorStack.pop());
                    }
                    operatorStack.push(txt[i]);

                    break;
                }
            default:
                // If the command is ^ with no enclosure then make sure you can do x^2^2 kind of stuff
                if (txt[i] == '^' && txt[i] != '(') {
                    // If there was an already registered ^ command, then push it to the stack without taking anything out
                    if (operatorStack[operatorStack.length - 1] == '^') {
                        operatorStack.push(txt[i]);
                        break;
                    }
                    // Else do everything as if it's normal
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
                    // Continues until a command ( +-*/ kind of stuff )
                    if (!txt[i].match(/\w/)) {
                        if (txt[i] == '(')
                            parenth = true;
                        if (txt[i] == '-' && i == n) {
                            // Do nothing for effect
                        }
                        else
                            break;
                    }
                    i++;
                }
                // Variables
                let str = txt.substring(n, i--);
                let q = -1;

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
                            q = a;
                            break;
                        }
                    }
                }
                else {
                    str = str.replace(/(sin|cos|tan|csc|sec|cot|sinh|cosh|tanh|csch|sech|coth|log|ln)/g, "\\$1 ");
                }

                // If there is no command slapped in, then push regularly
                if(q<= 0)
                    tree.push(str);
                // Else push the first bit, push a multiplier, lastly push the command
                else {
                    // Variables
                    let prec = getPrecedence('*');

                    tree.push(str.substring(0, q));

                    while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                        doBinary.call(this, operatorStack.pop());
                    }
                    operatorStack.push('*');

                    tree.push(str.substring(q));
                }
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