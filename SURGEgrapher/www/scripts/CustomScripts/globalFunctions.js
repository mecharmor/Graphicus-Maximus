
const funcs = [
    "sin", "cos", "tan",
    "csc", "sec", "cot",
    "sinh", "cosh", "tanh",
    "csch", "sech", "coth",
    "log", "ln",
	
	// Special ones that are not latex, but are graphable
	"abs"
];

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
    const latex = constructTree(tree, true);
	
	console.log(displayTree(tree));
	console.log(latex);
    
    return latex;
}

// Constructs the binary expression tree
function constructTree(tree, start) {
    if (typeof (tree) != "object")
        return tree;

    // Variables
    let str = "";
	
	if(start)	{
		for(let i= 0; i< tree.length; i++)	{
			str+=	constructTree(tree[i])+" ";
		}
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
			if(tree[1].indexOf("_")!= -1)	{
				tree[1]=	insert(tree[1], tree[1].indexOf("_"), "^{")+"}";
			}
			switch(tree[1])	{
				case "abs":
					str=	" "+tree[1]+"("+constructTree(tree[2])+") ";
					break;
				default:
					str = " \\" + tree[1] + "{(" + constructTree(tree[2]) + ")} ";
					break;
			}
        } break;
        case "()": {
            str = " (" + constructTree(tree[1]) + ") ";
        } break;
		case '=':	{
			str=	constructTree(tree[1])+" = "+constructTree(tree[2]);
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
		case '=':
            return true;
    }

    return false;
}

function getPrecedence(op) {
    switch (op) {
		case '=':
			return -1;
        case '+':
        case '-':
            return 1;
        case '/':
        case '*':
            return 2;
        case '^':
            return 4;
		case '{':
			return 3;
        default:
            return 0;
    }
}

// Replaces the given index in the string. Basically (str[index]= replacement)
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function insert(str, index, insertion)	{
	return str.substr(0, index)+insertion+str.substr(index+1);
}

function remove(str, index)	{
	return str.substr(0, index)+str.substr(index+1);
}

function createExpressionTree(txt) {
    // Variables
    let tree = [];
    let operatorStack = [];
    let txtIndex = -1;

    function doBinary(op) {
		console.log(displayTree(tree));
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
	
	for(let i= 0; i< funcs.length; i++)	{
		do	{
			txtIndex=	txt.indexOf(funcs[i]+"^", txtIndex+1);
			if(txtIndex!= -1)
				txt=	replaceAt(txt, txt.indexOf("^", txtIndex), "_");
		}while(txtIndex!= -1 && txtIndex< txt.length);	
		txtIndex=	-1;
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
			case '=':
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
				// Variables
				let	specialExpCase=	false;
				
                // If the command is ^ with no enclosure then make sure you can do x^2^2 kind of stuff
                if (txt[i] == '^')	{
                    // If there was an already registered ^ command, then push it to the stack without taking anything out
                    if (operatorStack[operatorStack.length - 1] == '^') {
                        operatorStack.push(txt[i]);
                        break;
                    }
					
                    // Else do everything as if it's normal
                    // Variables
                    let prec = getPrecedence(txt[i]);
					let	temp=	"";
					
                    for (let a = i-1; a >= 0; a--) {
						if(!txt[a].match(/\w/))
							break;
                        temp= txt[a] + temp;
						for(let b= 0; b< funcs.length; b++)	{
							if(temp.indexOf(funcs[b])!= -1)	{
								specialExpCase=	true;
								break;
							}
						}
						if(specialExpCase)
							break;
                    }
					if(!specialExpCase)	{						
						while (operatorStack.length > 0 && prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
							doBinary.call(this, operatorStack.pop());
						}
						operatorStack.push(txt[i]);
						break;
					}
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
						//else if(txt[i]== '^' && specialExpCase)	{
							// Continue to do nothing for effect
						//}
                        else
                            break;
                    }
                    i++;
                }
                // Variables
				let _prec = getPrecedence('*');
                let str = txt.substring(n, i--);
				let	p=	0;
                let q = str.length;
				
				// Locates the constants before the variables
				for(let a= 0; a< str.length; a++)	{
					if(!str[a].match(/[0-9]/))	{
						p=	a;
						break;
					}
				}

                // If there was a parenthesis at the end of this operand, then
                // find if it is a function of some kind
                if(parenth) {
                    // Variables
                    let funcName = "";
                    let c = 0;
					//let	d=	(txt[i]== '_');
					//let	e=	-1;
					let	found=	false;
					
                    // Reverse searches bro :sunglasses: :+1:
                    for (let a = str.length - 1; a >= 0; a--) {
                        funcName = str[a] + funcName;
						for(let b= 0; b< funcs.length; b++)	{
							if(funcName.indexOf(funcs[b])!= -1)	{
								found=	true;
								break;
							}
						}
                        if(found) {
                            for (let b = i + 2; b < txt.length; b++) {
								/*if(d)	{
									if(txt[b]== '(')	c++;
									if(txt[b]== ')' && c== 0)	{
										b+=	1;
										console.log(txt[b]);
										txt=	remove(txt, b);
										console.log(txt[b], "TEST", txt.substring(i+1, b));
										d=	false;
										e=	b;
										txt = replaceAt(txt, i+1, '[');
										txt = replaceAt(txt, b-1, ']');
										str=	str+txt.substring(txt.indexOf(str)+str.length, b-a);
										console.log(str);
										console.log(str.substring(a), a, b, b-a);
									}
									else if(txt[b]== ')')	{
										c--;
									}
								}
								else	{*/
									if(txt[b] == '(')	c++;
									if(txt[b] == ')' && c == 0) {
										txt = replaceAt(txt, i+1, '{');
										txt = replaceAt(txt, b, '}');
										break;
									}
									else if(txt[b] == ')') {
										c--;
									}
								//}
                            }
                            q = a;
                            break;
                        }
                    }
                }
                else {
                    str = str.replace(/(sin|cos|tan|csc|sec|cot|sinh|cosh|tanh|csch|sech|coth|log|ln)/g, "\\$1 ");
                }
				
				if(p== 0)	{
					tree.push(str.substring(0, q));
				}
				else	{
					tree.push(str.substring(0, p));
					
                    while (operatorStack.length > 0 && _prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
                        doBinary.call(this, operatorStack.pop());
                    }
                    operatorStack.push('*');
					
					tree.push(str.substring(p, q));
					
				}
				
				// Function found baby
				if(q!= str.length)	{
					if(q> 0 && operatorStack[operatorStack.length-1]!= '*')	{
						while (operatorStack.length > 0 && _prec <= getPrecedence(operatorStack[operatorStack.length - 1])) {
							doBinary.call(this, operatorStack.pop());
						}
						operatorStack.push('*');
					}
					else if(operatorStack[operatorStack.length-1]!= '*')
						tree.pop();
					
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