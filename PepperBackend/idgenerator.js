const idBtn = document.getElementById("generateID");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
idBtn.addEventListener("click", function () {
  console.log("Clicked");
  console.log(generateID());
});

    

const generateID = () => {
  console.log(data);
  if (!data) {
    ID = (currentYear - 2000) * 10000;
    console.log(ID);
    return ID + 1
  }
  else{
    return data.at(-1).ID + 1
  }
};
