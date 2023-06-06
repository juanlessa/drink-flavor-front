

export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) {
        return;
    }
    
    const { $checkTokens, $authenticate, $getAuthState } = useNuxtApp();

    const state = $getAuthState()
     const userHasToken = $checkTokens()

     if(userHasToken && !state.authenticated) {
        console.log('não ta autenticado e tem tokens');
        
        await $authenticate()        
    }


    if(!state.authenticated){
        return navigateTo("/");
    }
    
})