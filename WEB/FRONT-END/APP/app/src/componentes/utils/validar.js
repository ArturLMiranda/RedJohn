function validarDescricao(descricao) {
    if (!descricao || descricao.trim().length === 0) {
      return 'Descrição é obrigatória.';
    }
    if (descricao.length < 5) {
      return 'Descrição deve ter no mínimo 5 caracteres.';
    }
    if (descricao.length > 500) {
      return 'Descrição deve ter no máximo 500 caracteres.';
    }
    return null;
  }
  
  function validarDemandanteId(demandante_id) {
    if (!demandante_id || isNaN(demandante_id)) {
      return 'Selecione um demandante válido.';
    }
    return null;
  }
  
  function validarValidade(validade) {
    if (!validade) {
      return 'Data de validade é obrigatória.';
    }
    const hoje = new Date();
    const dataValidade = new Date(validade);
    if (dataValidade.toString() === 'Invalid Date') {
      return 'Data de validade inválida.';
    }
    if (dataValidade < hoje) {
      return 'A data de validade não pode ser no passado.';
    }
    return null;
  }
  
  function validarResponsaveis(responsaveis) {
    if (!Array.isArray(responsaveis) || responsaveis.length === 0) {
      return 'Selecione pelo menos um responsável.';
    }
    return null;
  }
  
  function validarTipoId(tipo_id) {
    if (!tipo_id || isNaN(tipo_id)) {
      return 'Selecione um tipo válido.';
    }
    return null;
  }
  
  function validarLoginId(login_id) {
    if (!login_id || isNaN(login_id)) {
      return 'Login de usuário inválido.';
    }
    return null;
  }
  