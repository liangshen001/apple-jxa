import 'packages/@apple-jxa/types'


const app = Application('Google Chrome')
app.includeStandardAdditions = true
let se = Application('System Events');


function clickMenuItem(processName: string, menuName: string, menuItemNames: string[], interval: number = 0.5) {
    let process = se.processes.byName(processName);
    let menu = process.menuBars[0].menuBarItems.byName(menuName);
    menu.click()
    delay(interval);
    for (let menuItemName of menuItemNames) {
        let menuItem = menu.menus[0].menuItems.byName(menuItemName);
        menuItem.click();
    }
}

clickMenuItem('Google Chrome', 'File', ['New Incognito Window'])

app.windows[0].tabs[0].url = 'https://webauth.wemixnetwork.com/run'

delay(2)
app.windows[0].tabs[0].execute({javascript: `
document.querySelector("#root > div > div.sc-dlfnbm.dKcSPX > ul > li:nth-child(1) > button > img").click()
`})
delay(4)
app.windows[0].tabs[0].execute({javascript: `
    document.querySelector("#identifierId").value = 'wangliang520WL@hotmail.com'
    document.querySelector("#identifierNext > div > button").click()
`})
delay(2)
app.windows[0].tabs[0].execute({javascript: `
    document.querySelector("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").value = 'kotsuw-bykxid-hUhpi6'
    document.querySelector("#passwordNext > div > button").click()
`})
delay(2)
app.windows[0].tabs[0].execute({javascript: `
document.querySelector("#root > section > div > form > div.sc-gWHgXt.esktPb > label").click()
document.querySelector("#root > section > div > form > div.sc-gWHgXt.lnAAyw > label").click()
document.querySelector("#root > section > div > form > div.sc-bBrOnJ.bhhAF > div > label").click()
document.querySelector("#root > section > div > form > button").click()
document.querySelector("#root > section > div > form > input").value = 'sdf23432233';
var e = document.createEvent("Event");
e.initEvent("input", true, true);
document.querySelector("#root > section > div > form > input").dispatchEvent(e)
document.querySelector("#root > section > div > form > button.sc-fodVxV.hQuDpo").click()
`})
delay(2)

app.windows[0].tabs[0].execute({javascript: `
document.querySelector("#root > section > div > form > input[name=pwdInput]").value = 'qwerR1234-'

var e = document.createEvent("Event");
e.initEvent("input", true, true);
document.querySelector("#root > section > div > form > input[name=pwdInput]").dispatchEvent(e)
document.querySelector("#root > section > div > form > input[name=pwdReInput]").value = 'qwerR1234-'

var e = document.createEvent("Event");
e.initEvent("input", true, true);
document.querySelector("#root > section > div > form > input[name=pwdReInput]").dispatchEvent(e)
document.querySelector("#root > section > div > form > button.sc-fodVxV.hQuDpo").click()
`})

delay(2)

const code = app.windows[0].tabs[0].execute({javascript: `
document.querySelector("#root > section > div > div > div > form > div.sc-dlfnbm.bJJjPw > p").innerText
`})
console.log(code)

app.windows[0].close()
