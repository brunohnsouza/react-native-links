# Iniciando com React Native

## O React Nativa
- Permite criação de aplicações nativas (Android, IOS, desktop e outras)
- Utiliza o React (JSX):
    ``` 
    function HomeScreen() {
        return (
            <View>
                <Text>Hello World</Text>
            </View>
        );
    }
    ```
- Única code base 
    - Na compilação, o `bundle` possibilitará seu código ser usado em várias plataformas 
- UI Nativa
    - Ao utilizar as marcações (tags) agnósticas (View, Text...), quando o projeto é executado no Android, por exemplo, ele será trocado pelas marcações nativas da plataforma
        - Genéricos -> Específicos  

## O Expo
- Framework que possuem diversas ferramentas que aumentam a produtividade (oficial do React Native)
- Há o App `Expo Go` ou emulador (esse último a instalação é automática na primeira execução)
> Pre-requisito: o PC e celular devem estar na mesma rede!

# Fundamendo do React Native

## Estruturas de Pastas e Arquivos
### app
- Arquivos de rota (expo router)
- Arquivos devem ser exportados em `default`
### assets