import {find} from "lodash/collection";
import {ThemeGenerator} from "./ThemeGenerator";
import dayjs from "dayjs";
import {differenceWith, isEqual, pickBy} from "lodash";

function cleanUpCurrency(s){
        //Watch for appended negatives
        if (typeof s === "string"){
            //remove space
            s = s.replace(/\s/g, "")
            //if negative at the back bring to front
            if (s.endsWith('-')){
                s = s.slice(0,s.length-1)
                s = '-'+s
            }
        }

        let expression = /^\$?\(?[\d,.]*\)?$/;
        //remove commas
        s = s.split(',').join('')
        //remove spaces
        s = s.split(' ').join('')
        //Check if it is in the proper format
        if (!isNaN(parseFloat(s))) return parseFloat(s);
        if(s.match(expression)){
            //It matched - strip out parentheses and append - at front
            return parseFloat('-' + s.replace(/[$(),]/g,''));
        }else{
            return parseFloat(s);
        }
    }

export const functions = {
    dayjs,
   getRandomColor(name, opacity = 0.3) {
       const getName = () => {
           let nameList = name.split(' ')
           if (nameList.length > 1){
               return (nameList[0].charAt(0)+nameList[1].charAt(0)).toUpperCase()
           }else{
               return (nameList[0].charAt(0)+nameList[0].charAt(1)).toUpperCase()
           }
       }
    // get first alphabet in upper case
    const firstAlphabet = name.charAt(0).toLowerCase();

    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);

    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    let num = Math.round(0xffffff * parseInt(colorNum));
    let r = num >> 16 & 255;
    let g = num >> 8 & 255;
    let b = num & 255;

    return {
      color: 'rgb(' + r + ', ' + g + ', ' + b + ', '+opacity+')',
      character: getName()
    };
  },
   parseTableStatus(status, mappings = []){
       // take list of mappings: ['tentative' => warning]
        let newmappings = [
          {name:'active', status:'success'},
          {name:'inactive', status:'danger'},
          {name:'pending', status:'danger'},
          {name:'partial', status:'warning'},
          {name:'suggested', status:'warning'},
          {name:'user', status:'success'},
          {name:'user-p', status:'success'},
          {name:'reconciled', status:'success'},
          {name:'unreconciled', status:'danger'},
        ].concat(mappings)
        //get status mapping:
        let mapping = find(newmappings, status)[0]

        if (!mapping) {
            return 'bg-indigo-100 text-churpy-dark'
        }

        //compute tailwind classes
        return new ThemeGenerator().badge(mapping.status)

    },
   ensignFigure(num){
		if (typeof num === 'string'){
		  return  parseFloat(cleanUpCurrency(num).toFixed(2))
		}else if(typeof num === 'number'){
			return parseFloat(num.toFixed(2))
		}
	},

   currency(val,decimals = 2,addSymbol = false){
       if (!addSymbol){
          return new Intl.NumberFormat('en-US', {minimumFractionDigits: decimals, maximumFractionDigits:3}).format(val)
       }
       return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: decimals, maximumFractionDigits:3 }).format(val)
   },
   formatMyNumber(x, dp=2){
        x = parseFloat(x).toFixed(dp);
        if(x && !isNaN(x)){
            var num_parts = x.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        return x;
    },
   makeTitle(slug, separator = '-') {
      let words = slug.split(separator);

      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(' ');
   },
   downloadFile(url,method,data,filename){
        return new Promise((resolve, reject)=>{
            axiosIns({
                  url: url,
                  method: method,
                  data: data,
                  responseType: 'blob',
              }).then((response) => {
                   let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                   let fileLink = document.createElement('a');

                   fileLink.href = fileURL;
                   fileLink.setAttribute('download', filename+'.pdf');
                   document.body.appendChild(fileLink);

                   fileLink.click();
                   resolve()
              })
              .catch((error)=>{
                  reject(error)
              })
        })
    },
    getObjectDifference(oldData, newData) {
        //if there is a length mismatch, return new
        if (oldData.length !== newData.length) return newData


        const objectDiff = (a, b) => {
          return pickBy(b, (v, k) => !isEqual(a[k], v))
        }
        let dif = differenceWith(oldData, newData, isEqual);

        let res = [];

        for(let i = 0; i < dif.length; i++){
          let item = dif[i]
          let item_index = oldData.indexOf(item)

          let internal_dif = objectDiff(item, newData[item_index]);
          let internal_dif_key = Object.keys(internal_dif)[0]

          res.push({old: item, new: newData[item_index], diff: {key: internal_dif_key,from: item[internal_dif_key], to: internal_dif[internal_dif_key]}})

        }

        return res
    },
   formatStrDate(date){
    return new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
   },
   numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
}
