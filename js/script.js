const nickName = document.getElementById("nickname"),
    coloredNick = document.getElementById("coloredNick"),
    savedColors = ["A020F0", "ffeeff", getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()],
    presets = {
        // none
        1: {
            colors: ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "9400D3"]
        },
        // me
        2: {
            colors: ["3494E6", "4B8FDF", "628BD8", "7986D1", "9081CA", "A77CC2", "BE78BB", "D573B4", "EC6EAD"]
        },
        // ben
        3: {
            colors: ["621493", "54117e", "460e69", "380b54", "2a093f", "1c062a", "0e0315", "000000"]
        },
        // mel
        4: {
            colors: ["5098ff", "3e95fe", "2d93fc", "1b90fb", "2889ec", "3481dc", "417acd"]
        },
        // Lissi
        5: {
            colors: ["8b00cc", "9c34f6", "ae69ee", "bf9de5", "A2A9B3", "A2A9B3", "a2c7e0", "73bce4", "45b1e8"]
        },
        // baron
        6: {
            colors: ["d00000", "e4800a", "dad200", "07d003", "0014cb"]
        },
        // Shira
        7: {
            colors: ["fb48f7", "eb44ed", "da3fe2", "ca3bd8", "ba36ce", "a932c3", "992db9", "8829ae", "7824a4"]
        },
        // Davi
        8: {
            colors: ["00c0cc", "cc00c4", "cc00c4"]
        },
        // Crock
        9: {
            colors: ["ff2aea", "ff3fb0", "ff5575", "ff6a3b", "ff7f00"]
        },
        // Cookie
        10: {
            colors: ["25ffe5", "1fccea", "1899ef", "1266f5", "0b33fa", "0500ff"]
        },
        // mochi
        11: {
            colors: ["90d35b", "a6de75", "bce890", "d1f3aa", "e7fdc4"]
        },
        //th3
        12: {
            colors: ["65adcd", "75b6d2", "86bfd7", "96c8dc", "a7d1e1", "b8dae6"]
        },
        //bunny
        13: {
            colors: ["d6d8fb", "d9d4fb", "dbd0fc", "decdfc", "e1c9fc", "e3c5fd", "e6c1fd"]
        },
        //scrooge
        14: {
            colors: ["fb0000", "fc1d05", "fc390a", "fd5610", "fe7313", "fe8f1a", "ffac1f"]
        }
    },
    formats = {
        0: {
            outputPrefix: "/nick ",
            template: "{#$1$2$3$4$5$6}$f$c",
            formatChar: "&",
            maxLength: 256
        },
        1: {
            outputPrefix: "/nick ",
            template: "&x&$1&$2&$3&$4&$5&$6$f$c",
            formatChar: "&",
            maxLength: 256
        },
        2: {
            outputPrefix: "",
            template: "{#$1$2$3$4$5$6}$f$c",
            formatChar: "&",
            maxLength: 256
        },

    };

function darkMode() {
    1 == document.getElementById("darkmode").checked ? (document.body.classList.add("dark"), document.getElementById("output-format").classList.add("dark"), document.getElementById("color-preset").classList.add("dark"), document.getElementById("numOfColors").classList.add("dark"), document.getElementById("graylabel1").classList.replace("gray", "darkgray"), document.getElementById("graylabel2").classList.replace("gray", "darkgray"), document.getElementById("outputText").classList.replace("gray", "darkgray"), document.getElementById("outputText").classList.replace("gray", "darkgray"), document.getElementById("error").classList.replace("errortext", "darkerrortext"), document.getElementById("numOfColors").classList.add("darktextboxes"), document.getElementById("nickname").classList.add("darktextboxes"), document.getElementById("outputText").classList.add("darktextboxes"), Array.from(document.getElementsByClassName("hexColor")).forEach((e => {
        document.getElementById(e.id).classList.add("darktextboxes")
    }))) : (document.body.classList.remove("dark"), document.getElementById("output-format").classList.remove("dark"), document.getElementById("color-preset").classList.remove("dark"), document.getElementById("numOfColors").classList.remove("dark"), document.getElementById("graylabel1").classList.replace("darkgray", "gray"), document.getElementById("graylabel2").classList.replace("darkgray", "gray"), document.getElementById("outputText").classList.replace("darkgray", "gray"), document.getElementById("error").classList.replace("darkerrortext", "errortext"), document.getElementById("numOfColors").classList.remove("darktextboxes"), document.getElementById("nickname").classList.remove("darktextboxes"), document.getElementById("outputText").classList.remove("darktextboxes"), Array.from(document.getElementsByClassName("hexColor")).forEach((e => {
        document.getElementById(e.id).classList.remove("darktextboxes")
    })))
}

function getRandomHexColor() {
    return Math.floor(16777215 * Math.random()).toString(16).toUpperCase()
}

function showError(e) {
    e ? (document.getElementById("error").style.display = "block", document.getElementById("outputText").style.height = "70px", document.getElementById("outputText").style.marginBottom = "5px") : (document.getElementById("error").style.display = "none", document.getElementById("outputText").style.height = "95px", document.getElementById("outputText").style.marginBottom = "10px")
}

function hex(e) {
    let t = "0123456789abcdef",
        o = parseInt(e);
    return 0 == o || isNaN(e) ? "00" : (o = Math.round(Math.min(Math.max(0, o), 255)), t.charAt((o - o % 16) / 16) + t.charAt(o % 16))
}

function convertToHex(e) {
    return hex(e[0]) + hex(e[1]) + hex(e[2])
}

function trim(e) {
    return "#" == e.charAt(0) ? e.substring(1, 7) : e
}

function convertToRGB(e) {
    let t = [];
    return t[0] = parseInt(trim(e).substring(0, 2), 16), t[1] = parseInt(trim(e).substring(2, 4), 16), t[2] = parseInt(trim(e).substring(4, 6), 16), t
}
class Gradient {
    constructor(e, t) {
        this.colors = e, this.gradients = [], this.steps = t - 1, this.step = 0;
        const o = this.steps / (e.length - 1);
        for (let t = 0; t < e.length - 1; t++) this.gradients.push(new TwoStopGradient(e[t], e[t + 1], o * t, o * (t + 1)))
    }
    next() {
        if (this.steps <= 1) return this.colors[0];
        const e = Math.round(Math.abs(2 * Math.asin(Math.sin(this.step * (Math.PI / (2 * this.steps)))) / Math.PI * this.steps));
        let t;
        if (this.gradients.length < 2) t = this.gradients[0].colorAt(e);
        else {
            const o = this.steps / this.gradients.length,
                r = Math.min(Math.floor(e / o), this.gradients.length - 1);
            t = this.gradients[r].colorAt(e)
        }
        return this.step++, t
    }
}
class TwoStopGradient {
    constructor(e, t, o, r) {
        this.startColor = e, this.endColor = t, this.lowerRange = o, this.upperRange = r
    }
    colorAt(e) {
        return [this.calculateHexPiece(e, this.startColor[0], this.endColor[0]), this.calculateHexPiece(e, this.startColor[1], this.endColor[1]), this.calculateHexPiece(e, this.startColor[2], this.endColor[2])]
    }
    calculateHexPiece(e, t, o) {
        const r = (o - t) / (this.upperRange - this.lowerRange);
        return Math.round(r * (e - this.lowerRange) + t)
    }
}

function toggleColors(e) {
    let t = Math.min(10, Math.max(2, e));
    1 == e || "" == e ? e = getColors().length : e != t && ($("#numOfColors").val(t), e = t);
    const o = $("#hexColors"),
        r = o.find(".hexColor"),
        a = r.size();
    if (a > e) r.each(((t, o) => {
        t + 1 > e && (savedColors[t] = $(o).val(), $(o).parent().remove())
    }));
    else if (a < e) {
        let t = $("#hexColorTemplate").html();
        for (let r = a + 1; r <= e; r++) {
            let e = t.replace(/\$NUM/g, r).replace(/\$VAL/g, savedColors[r - 1]);
            o.append(e)
        }
        jscolor.install()
    }
}

function getColors() {
    const e = $("#hexColors").find(".hexColor"),
        t = [];
    return e.each(((e, o) => {
        const r = $(o).val();
        savedColors[e] = r, t[e] = convertToRGB(r)
    })), t
}

function updateOutputText(e) {
    let t = formats[document.getElementById("output-format").value];
    if (t.outputPrefix && (nickName.value = nickName.value.replace(/ /g, ""), nickName.value)) {
        let t = /^[0-9a-zA-Z_]+$/;
        nickName.value.match(t) || (nickName.value = nickName.value.replace(e.data, "")), nickName.value.match(t) || (nickName.value = "birdflop.com")
    }
    let o = nickName.value;
    o || (o = "Type something!");
    const r = document.getElementById("bold").checked,
        a = document.getElementById("italics").checked,
        l = document.getElementById("underline").checked,
        n = document.getElementById("strike").checked;
    let s = document.getElementById("outputText"),
        c = new Gradient(getColors(), o.replace(/ /g, "").length),
        d = [],
        m = t.outputPrefix;
    for (let e = 0; e < o.length; e++) {
        let s = o.charAt(e);
        if (" " == s) {
            m += s, d.push(null);
            continue
        }
        let i = convertToHex(c.next());
        d.push(i);
        let u = t.template;
        for (let e = 1; e <= 6; e++) u = u.replace(`$${e}`, i.charAt(e - 1));
        let h = "";
        null != t.formatChar && (r && (h += t.formatChar + "l"), a && (h += t.formatChar + "o"), l && (h += t.formatChar + "n"), n && (h += t.formatChar + "m")), u = u.replace("$f", h), u = u.replace("$c", s), m += u
    }
    s.innerText = m, showError(null != t.maxLength && t.maxLength < m.length), displayColoredName(o, d)
}

function pad(e, t, o) {
    return o = o || "0", (e += "").length >= t ? e : new Array(t - e.length + 1).join(o) + e
}

function displayColoredName(e, t) {
    coloredNick.classList.remove("minecraftbold", "minecraftibold", "minecraftitalic"), document.getElementById("bold").checked ? document.getElementById("italics").checked ? coloredNick.classList.add("minecraftibold") : coloredNick.classList.add("minecraftbold") : document.getElementById("italics").checked && coloredNick.classList.add("minecraftitalic"), coloredNick.innerHTML = "";
    for (let o = 0; o < e.length; o++) {
        const r = document.createElement("span");
        document.getElementById("underline").checked ? document.getElementById("strike").checked ? r.classList.add("minecraftustrike") : r.classList.add("minecraftunderline") : document.getElementById("strike").checked && r.classList.add("minecraftstrike"), r.style.color = t[o], r.textContent = e[o], coloredNick.append(r)
    }
}

function preset(e) {
    const t = presets[e].colors,
        o = $("#hexColors");
    o.empty();
    let r = $("#hexColorTemplate").html();
    for (let e = 1; e <= t.length; e++) {
        let a = r.replace(/\$NUM/g, e).replace(/\$VAL/g, t[e - 1]);
        o.append(a)
    }
    jscolor.install()
}

function Alert(){
    Alert("Nope.");
}

toggleColors(2), updateOutputText()

