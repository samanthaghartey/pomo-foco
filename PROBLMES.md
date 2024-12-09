- Problems I enountered
  \*A. Clearing Intervals
  I was creating the interval but not clearning it when the component unmounted
  So I just kept creating new intervals when isRunning was set to true

\*B. Scope of Interval
The intervals were being called inside theuseEffect block but the function outside of it
I thought they would only run when useEffect runs ie when isRunning changes value
So I was wondering why they run contunously.

- Conclusion
  I understand it now
  \*/
