// const table = '<% list.forEach( (el, index) => { %> \
//     <tr> \
//         <td><a href="#" data-id="<%=index%>" data-action="view"><%=el.name%></a></td> \
//         <td><%=el.count%></td> \
//         <td><%=application.priceMaker( el.price )%></td> \
//         <td class="d-flex justify-content-around"> \
//             <button type="button" class="btn btn-info" data-id="<%=index%>" data-action="edit">Edit</button> \
//             <button type="button" class="btn btn-danger" data-id="<%=index%>" data-action="delete">Delete</button> \
//         </td> \
//     </tr> \
// <% }) %>';