

export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) {
        return;
    }

    const { $checkTokens, $authenticate, $getAuthState } = useNuxtApp();


    const state = $getAuthState()
    const userHasToken = $checkTokens()


     if(userHasToken && !state.authenticated) {        
        await $authenticate()        
    }

  
    if(state.authenticated && to.path === '/login') {        
        return navigateTo("/")
     }
})