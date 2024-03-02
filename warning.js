const resolver = {
    resolve: function (options, callback) {
      const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
      const combinedOptions = { ...options, resolveString };
  
      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      }
  
      function doRandomiserEffect(options, callback) {
        const { characters, timeout, element, partialString, iterations } = options;
  
        setTimeout(() => {
          if (iterations >= 0) {
            const nextOptions = { ...options, iterations: iterations - 1 };
  
            if (iterations === 0) {
              element.textContent = partialString;
            } else {
              element.textContent = partialString.slice(0, -1) + randomCharacter(characters);
            }
  
            doRandomiserEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            callback();
          }
        }, timeout);
      }
  
      function doResolverEffect(options, callback) {
        const { resolveString, characters, offset } = options;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = { ...options, partialString };
  
        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = { ...options, offset: offset + 1 };
  
          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            callback();
          }
        });
      }
  
      doResolverEffect(combinedOptions, callback);
    },
  };
  
  const strings = [
    'The Site\'s under development',
    'It\'s not available for mobile devices',
    'Might take weeks to make it ready',
    'If you can\'t wait that long..',
    'Go grab a monitor & check it out!',
    'PS : Don\'t turn on Desktop Site, It still won\'t work',
    ':)',
  ];
  
  let suriyan = 0;
  
  const options = {
    offset: 0,
    timeout: 5,
    iterations: 10,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    resolveString: strings[suriyan],
    element: document.querySelector('[data-target-resolver]'),
  };
  
  function callback() {
    setTimeout(() => {
      suriyan++;
  
      if (suriyan >= strings.length) {
        suriyan = 0;
      }
  
      let nextOptions = { ...options, resolveString: strings[suriyan] };
      resolver.resolve(nextOptions, callback);
    }, 1000);
  }
  
  resolver.resolve(options, callback);
  



