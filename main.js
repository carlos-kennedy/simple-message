import "./style.css";
import IMask from "imask";
import swal from "sweetalert";

const $ = document;
const iName = $.querySelector("#yourName");
const btn = $.querySelector("#btn");
const iValue = $.querySelector("#phoneNumber");
const form = $.querySelector("form");
const subjectValue = $.querySelector("#subject");

const maskForNumber = IMask.createMask({
  mask: "+{55}(00)0 0000-0000",
});
const maskForText = IMask.createMask({
  mask: /^[a-z A-Z.]{1,30}$/,
});
const maskItext = IMask(iName, maskForText);
const maskInumber = IMask(iValue, maskForNumber);

swal({
  title: "Informação",
  text: "Olá! Bem-vindo a este site, onde você pode inserir os detalhes do número e o assunto com o qual deseja conversar. Para uma experiência otimizada, é recomendado ter o WhatsApp instalado no seu dispositivo ou usar o WhatsApp Web. ",
  icon: "info",
});

function getValueAndGo(e) {
  const key = e.key;
  if (
    iValue.value.length == 18 &&
    subjectValue.value.length != 0 &&
    key === "Enter"
  ) {
    swal({
      title: "Informações preenchidas",
      text: `${maskItext.value} você será redirecionado para o whatsapp`,
      icon: "success",
    });

    setTimeout(() => {
      window.location.href = `http://api.whatsapp.com/send?1=pt_BR&phone=${maskInumber.unmaskedValue}&text=${subjectValue.value}`;
    }, 2500);
  } else if (
    key === "Enter" &&
    iValue.value.length <= 18 &&
    subjectValue.value.length == 0
  ) {
    swal({
      title: "Informações erradas ou não preenchidas",
      text: `${iName.value} Por favor, preencha as caixas corretamente`,
      icon: "error",
    });
    setTimeout(() => {
      window.location.href = "";
    }, 2000);
  }
}
addEventListener("keypress", getValueAndGo);

function makeThisUndisable() {
  if (iValue.value.length == 18 && subjectValue.value.length != 0) {
    btn.removeAttribute("disabled");
    btn.style.transition = ".85s";
  }
}
addEventListener("keypress", makeThisUndisable);

form.addEventListener("click", (e) => {
  e.preventDefault();
});

btn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = `http://api.whatsapp.com/send?1=pt_BR&phone=${maskInumber.unmaskedValue}&text=${subjectValue.value}`;
  }, 2500);
});
