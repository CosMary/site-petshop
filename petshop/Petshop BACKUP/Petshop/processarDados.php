<?php

// Define o fuso horário para o do Brasil
date_default_timezone_set('America/Sao_Paulo');

// Pegar dados vindo do formulário
$nome = $_POST['username'];
$email = $_POST['email'];
$celular = $_POST['celular'];
$cpf = $_POST['cpf'];
$genero = $_POST['generoCadastro'];
if ($genero === 'outro' && !empty($_POST['outroGenero'])) {
     $genero = $_POST['outroGenero'];
}

if (empty($genero)) {
    die("Erro: campo gênero não foi enviado pelo formulário.");
}
$nascimento = $_POST['nascimento'];
$senha = $_POST['senha'];
$data_atual = date('d/m/Y');
$hora_atual = date('H:i:s');

// Configurações de Credenciais
$server = 'localhost';
$usuario = 'root';
$senha_db = '';
$banco = 'formulario_cadastro';

// Conexão com Banco de Dados
$conn = new mysqli($server, $usuario, $senha_db, $banco);

// Verificar Conexão
if($conn->connect_error){
     die("Falha na conexão com o banco de dados: ".$conn->connect_error);
}

$smtp = $conn->prepare("INSERT INTO cadastro (nome, email, celular, cpf, genero, nascimento, senha, data, hora) VALUES (?,?,?,?,?,?,?,?,?)");
$smtp->bind_param("sssssssss", $nome, $email, $celular, $cpf, $genero, $nascimento, $senha, $data_atual, $hora_atual);

if($smtp->execute()){
     echo "Cadastro feito com sucesso!";
} else {
     echo "Erro no cadastro: ".$smtp->error;
}

$smtp->close();
$conn->close();

?>