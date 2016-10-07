function J = computeCostMulti(X, y, theta)

% Initialize some useful values
m = length(y); % number of training examples
J = 0;

% Compute the cost of a particular choice of theta
J = sum((X * theta - y) .^ 2) / (2*m)
end
