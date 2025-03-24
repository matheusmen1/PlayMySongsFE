function contemCaracterEspecial(string) 
{
  const specialChars = "!@#$%^&*()+-=[]{};':\"\\|,.<>/?~";

  var flag = 1;
  for (var i = 0; i < specialChars.length; i++)
  {
      for (var j = 0; j < string.length; j++)
      {
          if (string[j] == specialChars[i]) 
            flag = 0;
      }
  }
  return flag; 
}
function extensaoArquivo(string)
{
  var i = 0, flag = 0;
  while(i < string.length)
  {
    if (string[i] == '.')
    {
      i++;
      if(string[i] == 'm')
      {
        i++;
        if(string[i] == 'p')
        {
          i++;
          if(string[i] == '3')
          {
            flag = 1;
          }
        }
      }
    }

    i++;
  }
  return flag;
}
function limparForm()
{
    var fdados = document.getElementById("fmusica");
    fdados.titulo.value="";
    fdados.artista.value="";
    fdados.estilo.value="";
    fdados.foto.value="";
}

function validarCampos()
{
  const titulo = document.getElementById("titulo").value;
  const artista = document.getElementById("artista").value;
  const estilo = document.getElementById("estilo").value;
  const foto = document.getElementById("foto").value;
  
  if (titulo != "" && artista != "" && foto != "" && estilo != "")
  {
    if (contemCaracterEspecial(titulo) && contemCaracterEspecial(artista)) // 1 e 1
    {
        if (extensaoArquivo(foto))
        {
          cadMusica();
          alert("Música Cadastrada Com Sucesso")
        }
        else
        {
          alert("Tipo de Arquivo Não Permitido")
        }
    }
    else
    {
      alert("Não é Permitido o Uso de Caracteres Especiais")
    }
  }
  else
  {
    alert("Campo(s) Não Preenchido(s)")
  }
  limparForm();
}
function cadMusica() 
{
    const URL = "http://localhost:8080/apis/add-music";
    const fmusica = document.getElementById("fmusica");
    const formData = new FormData(fmusica);

    fetch(URL, {
        method: 'POST',
        body: formData, 
    })
    .then((response) => response.json())
    .then((json) => {
        //alert("Resposta do servidor: " + JSON.stringify(json));
        fmusica.reset(); 
    })
    .catch((error) => console.error("Erro ao enviar dados:", error));
}

function buscarMusica()
{
    const resultado = document.getElementById("resultado");
    let filtro = document.getElementById("filtro").value;
    
    if(filtro.length > 0) // busca com filtro
    {
      filtro = filtro.replace(" ", "");
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      let erro = false;
      fetch("http://localhost:8080/apis/find-musics/"+filtro, requestOptions)
        .then((response) => {

            if (!response.ok) erro = true;
            return response.json()
        }) 
        .then((result) => 
          {
            if(erro)
              resultado.innerHTML = result.mensagem;
            else
              {
                let html = "";
                result.forEach(element => {
                  let audioSrc = `${element.fileName}`;
                  let audio = `${element.titulo}_${element.estilo}_${element.artista}.mp3`
                  html += `<div>
                              <audio controls>
                                  <source src="${audioSrc}" type = "audio/mpeg">
                              </audio>
                              <p>${audio}</p><br><br>
                          </div>`
              
                });
                resultado.innerHTML = html; 
              }  

          }) 
        .catch((error) => resultado.innerHTML = error);  


    }
    else // exibe todas as musicas
    {

      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      let erro = false;
      fetch("http://localhost:8080/apis/find-musics", requestOptions)
        .then((response) => {

            if (!response.ok) erro = true;
            return response.json()
        }) 
        .then((result) => 
          {
            if(erro)
              resultado.innerHTML = result.mensagem;
            else
              {
                let html = "";
                result.forEach(element => {
                  let audioSrc = `${element.fileName}`;
                  let audio = `${element.titulo}_${element.estilo}_${element.artista}.mp3`
                  html += `<div>
                              <audio controls>
                                  <source src="${audioSrc}" type = "audio/mpeg">
                              </audio>
                              <p>${audio}</p><br><br>
                          </div>`
              
                });
                resultado.innerHTML = html; 
              }  

          }) 
        .catch((error) => resultado.innerHTML = error);  


    }
    

}