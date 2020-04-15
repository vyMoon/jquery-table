const table = '<% list.forEach( (el) => { %> \
    <tr> \
        <td><a href="/"><%=el.name%></a></td> \
        <td><%=el.count%></td> \
        <td><%=priceMaker( el.price )%></td> \
        <td class="d-flex justify-content-around"> \
            <button type="button" class="btn btn-info">Edit</button> \
            <button type="button" class="btn btn-danger">Delete</button> \
        </td> \
    </tr> \
<% }) %>';

// export { table }