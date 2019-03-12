/**
 * @xml转换模块
 * @保留-暂不使用
 */
//导入模块
var parser = require('fast-xml-parser');
var he = require('he');

var xmlToJsonOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {
        isAttributeValue: true
    }), //default is a=>a
    tagValueProcessor: a => he.decode(a) //default is a=>a
};

// Intermediate obj
// var tObj = parser.getTraversalObj(xmlData, xmlToJsonOptions);
// var jsonObj = parser.convertToJson(tObj, xmlToJsonOptions);


var jParser = require("fast-xml-parser").j2xParser;
//default options need not to set
var defaultOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "@", //default is false
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataTagName: "__cdata", //default is false
    cdataPositionChar: "\\c",
    format: false,
    indentBy: "  ",
    supressEmptyNode: false,
    tagValueProcessor: a => he.encode(a, {
        useNamedReferences: true
    }), // default is a=>a
    attrValueProcessor: a => he.encode(a, {
        isAttributeValue: isAttribute,
        useNamedReferences: true
    }) // default is a=>a
};


/**
 * [xml 转 json]
 * @param  {[type]} xmlData [待转换xml数据]
 * @return {[type]}         [json结果]
 */
exports.xmlToJson = (xmlData) => {
    if (parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
        // var jsonObj = parser.parse(xmlData, xmlToJsonOptions);
        return parser.parse(xmlData, xmlToJsonOptions);
    }
}

/**
 * [json 转 xml]
 * @param  {[type]} jsonData [待转换json数据]
 * @return {[type]}         [xml结果]
 */
exports.jsonToXml = (jsonData) => {
    var jparser = new jParser(defaultOptions);
    return jparser.parse(jsonData);
}