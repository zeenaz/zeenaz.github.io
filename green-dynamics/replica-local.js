/* Local-only study: never transmit form fields to the original service. */
document.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  let note = form.querySelector('[data-replica-status]');
  if (!note) {
    note = document.createElement('p');
    note.dataset.replicaStatus = '';
    note.setAttribute('role', 'status');
    form.append(note);
  }
  note.textContent = 'Local visual study — this form is not connected and no information was sent.';
}, true);
