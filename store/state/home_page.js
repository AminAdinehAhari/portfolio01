
export const state = () => ({
    releaseDate: {},
    resultTotalPage: 1,
    resultPage: 1,
});

export const mutations = {
    setReleaseDate(state, data){
        console.log(data)
        state.releaseDate = data;
    },
    setResultTotalPage(state, data){
        state.resultTotalPage = data;
    },
    setResultPage(state, data){
        state.resultPage = data;
    },
};

export const actions = {};
