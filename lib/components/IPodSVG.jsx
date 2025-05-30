import React, { useRef, useEffect, useState } from 'react'

const IPodSVG = ({ className, onBtnClick, onDimensionsChange, onScroll }) => {
  const rectRef = useRef()
  const clickWheelRef = useRef()
  const lastEventTime = useRef(0)

  const [rectDimensions, setRectDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [lastAngle, setLastAngle] = useState(null)
  const [direction, setDirection] = useState(null)
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)

  const angleThreshold = 30

  useEffect(() => {
    if (rectRef.current) {
      // Get the bounding box of the rect
      const bbox = rectRef.current.getBoundingClientRect()
      const newDimensions = {
        width: bbox.width,
        height: bbox.height,
        x: bbox.x,
        y: bbox.y,
      }
      setRectDimensions(newDimensions)
      onDimensionsChange(newDimensions)
    }
  }, [onDimensionsChange])

  useEffect(() => {
    const updateCenter = () => {
      if (clickWheelRef.current) {
        const bbox = clickWheelRef.current.getBoundingClientRect()
        setCenterX(bbox.x + bbox.width / 2)
        setCenterY(bbox.y + bbox.height / 2)
      }
    }

    // Update on resize
    window.addEventListener('resize', updateCenter)

    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  const handleClick = (event) => {
    event.target.id == 'left-button-overlay'
      ? onBtnClick('left-button')
      : onBtnClick(event.target.id)
  }

  useEffect(() => {
    if (clickWheelRef.current) {
      const bbox = clickWheelRef.current.getBoundingClientRect()
      setCenterX(bbox.x + bbox.width / 2)
      setCenterY(bbox.y + bbox.height / 2)
    }
  }, [])

  // Convert mouse position to angle
  const calculateAngle = (x, y) => {
    const dx = x - centerX
    const dy = y - centerY
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    const initialAngle = calculateAngle(e.clientX, e.clientY)
    setLastAngle(initialAngle)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Ensure single finger touch
      setIsDragging(true)
      const touch = e.touches[0]
      const initialAngle = calculateAngle(touch.clientX, touch.clientY)
      setLastAngle(initialAngle)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const currentAngle = calculateAngle(e.clientX, e.clientY)

    if (lastAngle !== null) {
      handleScrollDirectionChange(currentAngle)
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return

    const touch = e.touches[0]
    const currentAngle = calculateAngle(touch.clientX, touch.clientY)

    if (lastAngle !== null) {
      handleScrollDirectionChange(currentAngle)
    }
  }

  const handleScrollDirectionChange = (currentAngle) => {
    const now = Date.now()
    let angleDifference = currentAngle - lastAngle

    // Adjust for crossing 180-degree boundary
    if (angleDifference > 180) angleDifference -= 360
    if (angleDifference < -180) angleDifference += 360

    // Only proceed if angle change exceeds threshold
    if (Math.abs(angleDifference) > angleThreshold) {
      const newDirection = angleDifference > 0 ? 'clockwise' : 'counterclockwise'

      // Check if the direction is the same as the last detected direction
      if (direction === newDirection) {
        const timeSinceLastEvent = now - lastEventTime.current

        // If the last event was recent and in the same direction, emit the event
        if (timeSinceLastEvent > 100) {
          onScroll(newDirection)
        }
      }

      // Update state with the latest information
      setDirection(newDirection)
      setLastAngle(currentAngle)
      lastEventTime.current = now
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setLastAngle(null)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div>
      <svg
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        width={557.22125}
        height={1008.8777}
        viewBox="0 0 557.22125 1008.8777"
        id="svg2"
        sodipodi:version={0.32}
        inkscape:version="0.48.4 r9939"
        sodipodi:docname="Mini_iPod.svg"
        inkscape:output_extension="org.inkscape.output.svg.inkscape"
        className={className}
      >
        <defs id="defs4">
          <linearGradient id="linearGradient4242">
            <stop
              style={{
                stopColor: '#292e31',
                stopOpacity: 0.19298245,
              }}
              offset={0}
              id="stop4244"
            />
            <stop
              style={{
                stopColor: '#292e31',
                stopOpacity: 0,
              }}
              offset={1}
              id="stop4246"
            />
          </linearGradient>
          <linearGradient id="linearGradient4162">
            <stop
              style={{
                stopColor: '#6f7275',
                stopOpacity: 1,
              }}
              offset={0}
              id="stop4164"
            />
            <stop
              style={{
                stopColor: '#646669',
                stopOpacity: 0,
              }}
              offset={1}
              id="stop4166"
            />
          </linearGradient>
          <linearGradient id="linearGradient4116">
            <stop
              style={{
                stopColor: '#6e715d',
                stopOpacity: 1,
              }}
              offset={0}
              id="stop4118"
            />
            <stop
              style={{
                stopColor: '#6e7c5a',
                stopOpacity: 1,
              }}
              offset={1}
              id="stop4120"
            />
          </linearGradient>
          <linearGradient id="linearGradient4080">
            <stop
              id="stop4082"
              offset={0}
              style={{
                stopColor: '#727378',
                stopOpacity: 1,
              }}
            />
            <stop
              style={{
                stopColor: '#5f5f69',
                stopOpacity: 1,
              }}
              offset={0.05265833}
              id="stop4084"
            />
            <stop
              id="stop4096"
              offset={0.09884508}
              style={{
                stopColor: '#dadbdd',
                stopOpacity: 1,
              }}
            />
            <stop
              style={{
                stopColor: '#dadbdd',
                stopOpacity: 1,
              }}
              offset={0.89524442}
              id="stop4086"
            />
            <stop
              style={{
                stopColor: '#5a5a62',
                stopOpacity: 1,
              }}
              offset={0.95613509}
              id="stop4088"
            />
            <stop
              id="stop4090"
              offset={1}
              style={{
                stopColor: '#67686c',
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient id="linearGradient4016">
            <stop
              style={{
                stopColor: '#dadbdd',
                stopOpacity: 1,
              }}
              offset={0}
              id="stop4018"
            />
            <stop
              id="stop4028"
              offset={0.125}
              style={{
                stopColor: '#dadbdd',
                stopOpacity: 0.8745098,
              }}
            />
            <stop
              id="stop4026"
              offset={0.86294192}
              style={{
                stopColor: '#dbdcde',
                stopOpacity: 1,
              }}
            />
            <stop
              id="stop4024"
              offset={0.93756044}
              style={{
                stopColor: '#5b5b63',
                stopOpacity: 1,
              }}
            />
            <stop
              style={{
                stopColor: '#5b5b63',
                stopOpacity: 1,
              }}
              offset={1}
              id="stop4020"
            />
          </linearGradient>
          <linearGradient id="linearGradient4004">
            <stop
              id="stop4006"
              offset={0}
              style={{
                stopColor: '#e5e7e6',
                stopOpacity: 1,
              }}
            />
            <stop
              id="stop4008"
              offset={1}
              style={{
                stopColor: '#f7f7f7',
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient id="linearGradient3986">
            <stop
              style={{
                stopColor: '#f7f7f7',
                stopOpacity: 1,
              }}
              offset={0}
              id="stop3988"
            />
            <stop
              style={{
                stopColor: '#e3e5e4',
                stopOpacity: 1,
              }}
              offset={1}
              id="stop3990"
            />
          </linearGradient>
          <linearGradient id="linearGradient3970">
            <stop
              style={{
                stopColor: '#a1a3a2',
                stopOpacity: 1,
              }}
              offset={0}
              id="stop3972"
            />
            <stop
              style={{
                stopColor: '#d1d2e2',
                stopOpacity: 1,
              }}
              offset={1}
              id="stop3974"
            />
          </linearGradient>
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3970"
            id="linearGradient3976"
            x1={356.07819}
            y1={694.25812}
            x2={362.93787}
            y2={912.38641}
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3970"
            id="linearGradient3984"
            x1={281.71851}
            y1={463.39597}
            x2={466.59344}
            y2={878.32532}
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3986"
            id="radialGradient3994"
            cx={330.57083}
            cy={695.23077}
            fx={330.57083}
            fy={695.23077}
            r={69.786392}
            gradientTransform="matrix(0.80004035,1.2556965,-2.3192334,1.4776504,1679.6309,-737.81021)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4004"
            id="radialGradient4012"
            cx={374.61038}
            cy={720.19843}
            fx={374.61038}
            fy={720.19843}
            r={210.55289}
            gradientTransform="matrix(1.1020517,-1.638687e-7,2.230825e-7,1.5002771,-38.229791,-360.29834)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4080"
            id="linearGradient4072"
            gradientUnits="userSpaceOnUse"
            x1={96}
            y1={531.33411}
            x2={651.27075}
            y2={529.38354}
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4016"
            id="linearGradient4078"
            gradientUnits="userSpaceOnUse"
            x1={96}
            y1={531.33411}
            x2={657.12238}
            y2={529.38354}
            gradientTransform="matrix(1,0,0,0.69826639,0,160.32136)"
          />
          <filter inkscape:collect="always" id="filter4092" colorInterpolationFilters="sRGB">
            <feGaussianBlur
              inkscape:collect="always"
              stdDeviation={8.3648126}
              id="feGaussianBlur4094"
            />
          </filter>
          <filter inkscape:collect="always" id="filter4100" colorInterpolationFilters="sRGB">
            <feGaussianBlur
              inkscape:collect="always"
              stdDeviation={8.3623883}
              id="feGaussianBlur4102"
            />
          </filter>
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4116"
            id="linearGradient4122"
            x1={216.51555}
            y1={350.99683}
            x2={508.71271}
            y2={150.09082}
            gradientUnits="userSpaceOnUse"
          />
          <filter
            inkscape:collect="always"
            id="filter4134"
            x={-0.43952557}
            width={1.8790511}
            y={-0.0076954425}
            height={1.0153909}
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              inkscape:collect="always"
              stdDeviation={3.0145679}
              id="feGaussianBlur4136"
            />
          </filter>
          <filter
            inkscape:collect="always"
            id="filter4158"
            x={-0.64523047}
            width={2.2904611}
            y={-0.0091273123}
            height={1.0182546}
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              inkscape:collect="always"
              stdDeviation={3.4085752}
              id="feGaussianBlur4160"
            />
          </filter>
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4162"
            id="linearGradient4172"
            x1={638.42462}
            y1={82.281227}
            x2={646.00836}
            y2={895.65796}
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4016"
            id="linearGradient4178"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0,-2.495248e-6)"
            x1={96}
            y1={531.33411}
            x2={657.12238}
            y2={529.38354}
          />
          <filter
            inkscape:collect="always"
            id="filter4193"
            x={-0.36360699}
            width={1.727214}
            y={-0.076240174}
            height={1.1524802}
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              inkscape:collect="always"
              stdDeviation={19.208348}
              id="feGaussianBlur4195"
            />
          </filter>
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4242"
            id="linearGradient4256"
            x1={374.29349}
            y1={989.71216}
            x2={374.29349}
            y2={390.8949}
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4080"
            id="linearGradient4276"
            gradientUnits="userSpaceOnUse"
            x1={96}
            y1={531.33411}
            x2={651.27075}
            y2={529.38354}
          />
          <radialGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient4004"
            id="radialGradient4278"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1.1020517,-1.638687e-7,2.230825e-7,1.5002771,-38.229791,-360.29834)"
            cx={374.61038}
            cy={720.19843}
            fx={374.61038}
            fy={720.19843}
            r={210.55289}
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3970"
            id="linearGradient4280"
            gradientUnits="userSpaceOnUse"
            x1={356.07819}
            y1={694.25812}
            x2={362.93787}
            y2={912.38641}
          />
          <radialGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3986"
            id="radialGradient4282"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0.80004035,1.2556965,-2.3192334,1.4776504,1679.6309,-737.81021)"
            cx={330.57083}
            cy={695.23077}
            fx={330.57083}
            fy={695.23077}
            r={69.786392}
          />
          <linearGradient
            inkscape:collect="always"
            xlinkHref="#linearGradient3970"
            id="linearGradient4284"
            gradientUnits="userSpaceOnUse"
            x1={281.71851}
            y1={463.39597}
            x2={466.59344}
            y2={878.32532}
          />
        </defs>
        <sodipodi:namedview
          id="base"
          pagecolor="#ffffff"
          bordercolor="#666666"
          borderopacity={1}
          gridtolerance={10000}
          guidetolerance={10}
          objecttolerance={10}
          inkscape:pageopacity={0}
          inkscape:pageshadow={2}
          inkscape:zoom={0.51267756}
          inkscape:cx={246.72221}
          inkscape:cy={467.24741}
          inkscape:document-units="px"
          inkscape:current-layer="layer1"
          showgrid="false"
          inkscape:window-width={1440}
          inkscape:window-height={845}
          inkscape:window-x={0}
          inkscape:window-y={0}
          inkscape:window-maximized={1}
          showguides="true"
          inkscape:guide-bbox="true"
          fit-margin-top={0}
          fit-margin-left={0}
          fit-margin-right={0}
          fit-margin-bottom={0}
        />
        <metadata id="metadata7">
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>{'image/svg+xml'}</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title />
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <g
          inkscape:label="Layer 1"
          inkscape:groupmode="layer"
          id="layer1"
          transform="translate(-96,-26.895227)"
        >
          <rect
            rx={60.68668}
            ry={11.033942}
            y={26.895227}
            x={96}
            height={1008.8777}
            width={557.22125}
            id="rect3065"
            style={{
              fill: '#e9ebeb',
              fillOpacity: 1,
              stroke: 'none',
            }}
          />
          <rect
            style={{
              fill: 'url(#linearGradient4276)',
              fillOpacity: 1,
              stroke: 'none',
              filter: 'url(#filter4092)',
            }}
            id="rect3198"
            width={557.22125}
            height={1008.8777}
            x={96}
            y={26.895235}
            ry={11.033942}
            rx={60.68668}
            transform="matrix(1,0,0,1.4321182,0,-229.59914)"
          />
          <rect
            style={{
              fill: 'url(#linearGradient4256)',
              fillOpacity: 1,
              stroke: 'none',
            }}
            id="rect4238"
            width={557.22125}
            height={1008.8777}
            x={96}
            y={26.895227}
            ry={11.033942}
            rx={60.68668}
          />

          <g id="g4197" onMouseLeave={handleMouseLeave} onTouchCancel={handleMouseLeave}>
            {/*
            Click Wheel
         */}
            <path
              ref={clickWheelRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              inkscape:connector-curvature={0}
              id="clickwheel-button"
              style={{
                fill: 'url(#radialGradient4278)',
                fillOpacity: 1,
                stroke: 'url(#linearGradient4280)',
                strokeWidth: 1.5,
                strokeOpacity: 1,
              }}
              d="m 584.41327,720.19844 c 0,115.87087 -93.9322,209.80278 -209.8029,209.80278 -115.87081,0 -209.80287,-93.93191 -209.80287,-209.80278 0,-115.87086 93.93206,-209.80278 209.80287,-209.80278 115.8707,0 209.8029,93.93192 209.8029,209.80278 z"
            />

            {/*
            Center Button
         */}
            <path
              onClick={handleClick}
              d="m 443.64677,720.19844 c 0,38.12773 -30.9087,69.03635 -69.0364,69.03635 -38.1277,0 -69.03638,-30.90862 -69.03638,-69.03635 0,-38.12773 30.90868,-69.03636 69.03638,-69.03636 38.1277,0 69.0364,30.90863 69.0364,69.03636 z"
              style={{
                fill: 'url(#radialGradient4282)',
                fillOpacity: 1,
                stroke: 'url(#linearGradient4284)',
                strokeWidth: 1.5,
                strokeOpacity: 1,
              }}
              id="center-button"
              inkscape:connector-curvature={0}
            />
            <g
              style={{
                fill: '#989e9c',
                fillOpacity: 1,
              }}
              transform="matrix(0.85080399,0,0,0.85080399,156.12067,502.91709)"
              id="g3377"
            >
              {/*
            Menu
         */}
              <g>
                {/* Transparent overlay for Menu Button */}
                <rect
                  onClick={handleClick}
                  id="menu-button"
                  x={200}
                  y={40}
                  width={100}
                  height={30}
                  fill="transparent"
                />
                <path
                  onClick={handleClick}
                  id="menu-button"
                  inkscape:connector-curvature={0}
                  style={{
                    fill: '#989e9c',
                    fillOpacity: 1,
                  }}
                  d="m 210.03808,60.443822 1.01015,-23.583791 5.80838,0 5.3033,14.647213 5.3033,-14.647213 5.55584,0 1.51523,23.583791 -4.29315,0 -1.26269,-13.987341 -4.29315,13.987341 -4.54568,0 -4.54569,-14.492417 -0.75761,14.492417 -4.79823,0 z m 30.30458,0 0,-23.583791 13.63706,0 0,3.535535 -8.96511,0 0,5.808377 8.46003,0 0,3.535534 -8.46003,0 0,6.313453 9.21764,0 0,4.390892 -13.88959,0 z m 19.30314,0 0,-23.583791 4.54722,0 9.23672,15.358736 0,-15.358736 4.35004,0 0,23.583791 -4.35004,0 -9.23672,-16.098719 0,16.098719 -4.54722,0 z m 24.00715,-23.583791 4.92449,0 0,17.046325 c 0,4.042583 8.20749,3.166812 8.20749,0 l 0,-17.046325 5.17703,0 0,17.551401 c 0,4.103744 -4.60882,6.031376 -9.21764,6.03239 -4.60882,0.001 -9.21764,-1.924589 -9.21764,-6.03239 l 0.12627,-17.551401 z"
                />
              </g>

              {/*
            Play
         */}
              <g>
                {/* Transparent overlay for Play Button */}
                <rect
                  onClick={handleClick}
                  id="play-button"
                  x={200}
                  y={430}
                  width={80}
                  height={60}
                  fill="transparent"
                />
                <path
                  onClick={handleClick}
                  id="play-button"
                  inkscape:connector-curvature={0}
                  style={{
                    fill: '#989e9c',
                    fillOpacity: 1,
                  }}
                  d="m 227.84202,451.28938 22.96208,11.7842 -22.85593,12.33319 -0.10615,-24.11739 z m 36.36549,24.11739 0,-24.11739 6.77646,0 0,24.11739 -6.77646,0 z m 13.17408,0 0,-24.11739 6.77643,0 0,24.11739 -6.77643,0 z"
                />
              </g>

              {/*
            Left Button
         */}
              <g>
                {/* Transparent overlay for Left Button */}
                <rect
                  onClick={handleClick}
                  id="left-button-overlay"
                  x={0}
                  y={240}
                  width={100}
                  height={40}
                  fill="transparent"
                />
                <path
                  onClick={handleClick}
                  id="left-button"
                  inkscape:connector-curvature={0}
                  style={{
                    fill: '#989e9c',
                    fillOpacity: 1,
                  }}
                  d="m 65.442624,256.04517 18.409118,11.25 -0.0868,-22.5 -18.322319,11.25 z m -19.715884,11.33929 0,-23.125 -5.98214,0 0,23.21428 5.98214,-0.0893 z m 0.70662,-11.33929 18.409118,11.25 -0.0868,-22.5 -18.322319,11.25 z"
                />
              </g>

              {/*
            Right Button
         */}
              <g>
                {/* Transparent overlay for Right Button */}
                <rect
                  onClick={handleClick}
                  id="right-button"
                  x={410}
                  y={240}
                  width={100}
                  height={40}
                  fill="transparent"
                />
                <use
                  onClick={handleClick}
                  id="right-button"
                  xlinkHref="#left-button"
                  height={520}
                  width={512}
                  y={0}
                  x={0}
                  transform="matrix(-1,0,0,1,512,0)"
                  style={{
                    fill: '#989e9c',
                    fillOpacity: 1,
                  }}
                />
              </g>
            </g>
          </g>

          {/*
         Screen
      */}
          <rect
            ry={14.482048}
            y={95.167747}
            x={187.25739}
            height={289.29614}
            width={374.12}
            id="rect4106"
            style={{
              fill: 'url(#linearGradient4122)',
              fillOpacity: 1,
              stroke: 'none',
            }}
          />
          <rect
            ref={rectRef}
            ry={14.482048}
            y={95.167747}
            x={187.25739}
            height={289.29614}
            width={374.12}
            id="rect4098"
            style={{
              fill: 'none',
              stroke: '#0a0a0a',
              strokeWidth: 4,
              filter: 'url(#filter4100)',
              strokeOpacity: 1,
            }}
          />
        </g>
      </svg>
    </div>
  )
}

export default IPodSVG
