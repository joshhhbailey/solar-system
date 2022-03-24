const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  };
  
  class Resizer
  {
    constructor(container, camera, renderer) 
    {
      // Set initial size
      setSize(container, camera, renderer);
  
      // On window resize
      window.addEventListener('resize', () => {
        setSize(container, camera, renderer);
        this.onResize();    // Custom actions
      });
    }
  
    onResize() {}
  }
  
  export { Resizer };
  