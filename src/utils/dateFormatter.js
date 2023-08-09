/*
ebből: 
2023-05-18T07:24:16.281Z

ez: 
2023-05-18 - 07:24:16
*/

export const dateFormatter = (string) => {
  
    return string.slice(0, 10) + " - " + string.slice(11, 19)
}