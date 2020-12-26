import store from './redux/store';

const itemListDOM = $('#itemList');
const itemDOM = $('#item');
const txtNuevaNotaDOM = $('#txtNuevaNota');

txtNuevaNotaDOM.keyup((e) => {
    if (e.keyCode === 13) {
        const text = txtNuevaNotaDOM.val();
        txtNuevaNotaDOM.val('')
        store.dispatch({
            type: 'AGREGAR',
            payload: {
                text,
            }
        })
    }
})
function actualizarLista(items) {
    itemListDOM.html('');

    for (const item of items) {
        const cloneDOM = itemDOM.clone();
        const chkHabilitadoDOM = cloneDOM.find('input');
        const btnBorrarDOM = cloneDOM.find('button');
        const lblNombreDOM = cloneDOM.find('span');
        cloneDOM.removeClass('d-none');

        lblNombreDOM.html(item.text);

        if (item.completado) {
            lblNombreDOM.css('text-decoration', 'line-through');
        }

        btnBorrarDOM.on('click', () => {
            store.dispatch({
                type: 'BORRAR',
                payload: {
                    id: item.id
                }
            })
        })

        chkHabilitadoDOM.prop('checked', item.completado);

        chkHabilitadoDOM.on('click', () => {
            store.dispatch({
                type: 'ALTERNAR',
                payload: {
                    id: item.id
                }
            })
        })

        itemListDOM.append(cloneDOM);

    }


}
store.subscribe(() => {
    const state = store.getState();
    actualizarLista(state)


})

const actions = JSON.parse(localStorage.getItem('actions') || '[]');

actions.forEach((action, i) => {
    setTimeout(()=> {
        store.dispatch(action)
    }, i * 1000)
});


console.log(actions)