<?php

// Define o fuso horário para o do Brasil
date_default_timezone_set('America/Sao_Paulo');

// Configurações de Credenciais
$server = 'localhost';
$usuario = 'root';
$senha_db = '';
$banco = 'formulario_cadastro';

// Conexão com Banco de Dados
$conn = new mysqli($server, $usuario, $senha_db, $banco);

// Verificar Conexão
if($conn->connect_error)
{
   die("Falha na conexão com o banco de dados: ".$conn->connect_error);
}

if(isset($_POST['submit']) && !empty($_POST['email']) && !empty($_POST['senha']))
{
   // Acessa

   // Pegar dados vindo do formulário

      $email = $_POST['email'];
      $senha = $_POST['senha'];

      $sql = "SELECT * FROM cadastro WHERE email = '$email' and senha = '$senha'";

      $result = $conn->query($sql);

      if(mysqli_num_rows($result) < 1)
      {
         print_r('Não existe');
      }
      else
      {
         print_r('Existe');
      }

}
else
{
   // Não acessa
   header('Location: login petshop HTML.html');
}

?>