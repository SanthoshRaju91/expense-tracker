export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('landing'),
    this.use('toUp'),
    this.reverse('crossFade', { duration: 3000 })
  );

  this.transition(
    this.fromRoute('landing'),
    this.toRoute('adming'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.hasClass('login-if'),
    this.toValue(true),
    this.use('toLeft', {duration: 1000}),
    this.reverse('toRight', {duration: 1000})
  );
}
