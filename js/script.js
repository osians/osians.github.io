/**
 * when any of the SELECT elements change, do this...
 * @param {DOMElement} el
 */
function changed(el)
{
    /** @var {DOMElement}[] **/
    let selects = el.parentNode.children;
    let selectedValue = el.options[el.selectedIndex].value;

    for (let select of selects) {
        // se nao é um elemento select ou se foi o elemento que disparou a funcao continue!
        if (select.tagName !== 'SELECT' || select.name === el.name) {
            continue;
        }

        // se ainda nao foi escolhido uma opcao
        let currentSelectedValue = select.options[select.selectedIndex].value;
        if (currentSelectedValue === 0) {
            continue;
        }

        // se temos outro select com mesmo valor, resetamos ele
        if (currentSelectedValue === selectedValue) {
            select.selectedIndex = 0;
            continue;
        }
    }

    setValueToTable(el);
    setTableTransport(el);
    checkForEnabledResultButton();
}

/**
 * Set first table
 * @param {DOMElement} el
 */
function setValueToTable(el)
{
    document.getElementById('table_' + el.name).innerHTML = el.options[el.selectedIndex].value;
}

/**
 * set transport table
 * @param {DOMElement} el
 */
function setTableTransport(el)
{
    document.getElementById(el.name).innerHTML = el.options[el.selectedIndex].value;

    document.getElementById('total_v').innerHTML = calculaTotal('totalv').toString();
    document.getElementById('total_c').innerHTML = calculaTotal('totalc').toString();
    document.getElementById('total_a').innerHTML = calculaTotal('totala').toString();
    document.getElementById('total_d').innerHTML = calculaTotal('totald').toString();
}

/**
 * Verifica se deve ou nao dar enable no botao de ver resultados
 */
function checkForEnabledResultButton()
{
    let selects = document.getElementsByTagName('SELECT');
    for (let select of selects) {
        let currentSelectedValue = select.options[select.selectedIndex].value;
        if (parseInt(currentSelectedValue) === 0) {
            return;
        }
    }

    document.getElementById('btn_ver_resultados').disabled = false;
}

/**
 * Calc total values
 * @param {string} identifier
 * @returns {number}
 */
function calculaTotal(identifier)
{
    let elements = document.getElementsByClassName(identifier);
    let total = 0;
    for (let el of elements) {
        if (el.innerHTML === '') {
            continue;
        }
        total += parseInt(el.innerHTML);
    }
    return total * 2;
}

function visualizarResultados()
{
    destacarResultados();
    document.getElementById('resultados').classList.remove('esconder');
}

/**
 * make the test result highlighted
 */
function destacarResultados()
{
    let totalVisual = document.getElementById('total_v').innerHTML;
    let totalCinestesico = document.getElementById('total_c').innerHTML;
    let totalAuditivo = document.getElementById('total_a').innerHTML;
    let totalDigital = document.getElementById('total_d').innerHTML;

    let biggestNum = Math.max(totalVisual, totalCinestesico, totalAuditivo, totalDigital);

    if (totalVisual !== '' && parseInt(totalVisual) >= biggestNum) {
        highlightElementsByClassname('resultado_visual');
    }

    if (totalCinestesico !== '' && parseInt(totalCinestesico) >= biggestNum) {
        highlightElementsByClassname('resultado_cinestesico');
    }

    if (totalAuditivo !== '' && parseInt(totalAuditivo) >= biggestNum) {
        highlightElementsByClassname('resultado_auditivo');
    }

    if (totalDigital !== '' && parseInt(totalDigital) >= biggestNum) {
        highlightElementsByClassname('resultado_digital');
    }
}

function highlightElementsByClassname(classname)
{
    let elementos = document.getElementsByClassName(classname);
    for (let el of elementos) {
        el.classList.add('highlight');
    }
}